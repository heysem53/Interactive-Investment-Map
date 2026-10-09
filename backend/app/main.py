import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from .database import engine
from .services.opportunity_service import get_opportunity_by_code
from .ai.router import router as ai_router


app = FastAPI(
    title="Investment AI API",
    version="2.0.0",
)


# ------------------------------------------------------------------
# Temporary Database Seed Import
# ------------------------------------------------------------------

from pathlib import Path


def seed_database():
    seed_file = (
        Path(__file__).resolve().parents[2]
        / "investment_db_inserts.sql"
    )

    if not seed_file.exists():
        return

    try:
        with engine.begin() as connection:
            table_exists = connection.execute(
                text(
                    """
                    SELECT to_regclass(
                        'public.investment_opportunities'
                    )
                    """
                )
            ).scalar()

            if table_exists is not None:
                return

            sql_content = seed_file.read_text(
                encoding="utf-8"
            )
            
            # Remove PostgreSQL psql-only meta commands
            sql_lines = []
            
            for line in sql_content.splitlines():
                if not line.lstrip().startswith("\\"):
                    sql_lines.append(line)
            
            sql_content = "\n".join(sql_lines)
            
            connection.exec_driver_sql(sql_content)

    except Exception as error:
       import traceback
    
       print("========== TEMPORARY DATABASE SEED FAILED ==========")
       print(str(error))
       traceback.print_exc()
       print("======================================================")


seed_database()

# ------------------------------------------------------------------
# CORS
# ------------------------------------------------------------------

default_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://investment-ai-frontend.onrender.com",
]

configured_origins = os.getenv("CORS_ORIGINS", "")

allowed_origins = (
    [
        origin.strip()
        for origin in configured_origins.split(",")
        if origin.strip()
    ]
    if configured_origins
    else default_origins
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ------------------------------------------------------------------
# Routers
# ------------------------------------------------------------------

app.include_router(ai_router)


# ------------------------------------------------------------------
# Database Helpers
# ------------------------------------------------------------------

def fetch_all(
    query: str,
    params: dict | None = None,
):
    with engine.connect() as connection:
        result = connection.execute(
            text(query),
            params or {},
        )

        return [
            dict(row._mapping)
            for row in result.fetchall()
        ]


def fetch_one(
    query: str,
    params: dict | None = None,
):
    with engine.connect() as connection:
        result = connection.execute(
            text(query),
            params or {},
        )

        row = result.fetchone()

        if not row:
            return None

        return dict(row._mapping)


# ------------------------------------------------------------------
# Root
# ------------------------------------------------------------------

@app.get("/")
def root():
    return {
        "status": "ok",
        "message": "Investment AI API is running",
        "database": "PostgreSQL",
    }


# ------------------------------------------------------------------
# Health Check
# ------------------------------------------------------------------

@app.get("/api/health")
def health():
    try:
        database = fetch_one(
            """
            SELECT current_database() AS database
            """
        )

        return {
            "status": "ok",
            "message": "API is healthy",
            "database": database["database"],
        }

    except Exception:
        return {
            "status": "error",
            "message": "Database connection failed",
        }


# ------------------------------------------------------------------
# Database Test
# ------------------------------------------------------------------

@app.get("/api/db-test")
def db_test():
    try:
        row = fetch_one(
            """
            SELECT
                current_database() AS database,
                version() AS postgresql
            """
        )

        return {
            "status": "ok",
            "database": row["database"],
            "postgresql": row["postgresql"],
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail="Database connection test failed",
        ) from error


# ------------------------------------------------------------------
# Database Statistics
# ------------------------------------------------------------------

@app.get("/api/db-stats")
def db_stats():
    tables = [
        "investment_opportunities",
        "sectors",
        "sub_sectors",
        "locations",
        "project_details",
        "financial_data",
        "employment",
        "entities",
        "opportunity_approvals",
        "opportunity_infrastructure",
        "opportunity_site_features",
        "opportunity_attachments",
    ]

    try:
        result = {}

        for table in tables:
            row = fetch_one(
                f'''
                SELECT COUNT(*) AS count
                FROM "{table}"
                '''
            )

            result[table] = row["count"]

        return {
            "status": "ok",
            "tables": result,
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve database statistics",
        ) from error


# ------------------------------------------------------------------
# Reference Data
# ------------------------------------------------------------------

@app.get("/api/sectors")
def get_sectors():
    try:
        return fetch_all(
            """
            SELECT
                sector_id,
                name_ar,
                name_en,
                description_ar,
                description_en,
                is_active
            FROM sectors
            WHERE is_active = TRUE
            ORDER BY sector_id
            """
        )

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve sectors",
        ) from error


# ------------------------------------------------------------------
# All Opportunities
# ------------------------------------------------------------------

@app.get("/api/opportunities")
def get_opportunities():
    try:
        rows = fetch_all(
            """
            SELECT
                o.opportunity_id,
                o.opportunity_code,
                o.name_ar,
                o.name_en,
                o.sector_id,
                s.name_ar AS sector_name_ar,
                s.name_en AS sector_name_en,
                o.sub_sector_id,
                ss.name_ar AS sub_sector_name_ar,
                ss.name_en AS sub_sector_name_en,
                o.location_id,
                o.ownership_id,
                ot.name_ar AS ownership_name_ar,
                ot.name_en AS ownership_name_en,
                o.project_type_id,
                pt.name_ar AS project_type_name_ar,
                pt.name_en AS project_type_name_en,
                o.investor_type_id,
                it.name_ar AS investor_type_name_ar,
                it.name_en AS investor_type_name_en,
                o.contract_type_id,
                ct.name_ar AS contract_type_name_ar,
                ct.name_en AS contract_type_name_en,
                o.provider_entity_id,
                e.name_ar AS provider_entity_name_ar,
                e.name_en AS provider_entity_name_en,
                o.project_scale_id,
                ps.name_ar AS project_scale_name_ar,
                ps.name_en AS project_scale_name_en,
                o.status_id,
                os.name_ar AS status_name_ar,
                os.name_en AS status_name_en,
                f.estimated_cost,
                f.currency_id,
                c.name_ar AS currency_name_ar,
                c.name_en AS currency_name_en,
                c.symbol AS currency_symbol,
                f.financing_model_id,
                fm.name_ar AS financing_model_name_ar,
                fm.name_en AS financing_model_name_en,
                l.description_ar AS location_description_ar,
                l.description_en AS location_description_en,
                l.area_value,
                l.area_unit_id,
                au.name_ar AS area_unit_name_ar,
                au.symbol AS area_unit_symbol,
                l.latitude,
                l.longitude,
                l.map_url,
                pd.description_ar AS project_description_ar,
                pd.description_en AS project_description_en,
                pd.main_product_ar,
                pd.main_product_en,
                emp.total_jobs
            FROM investment_opportunities o
            LEFT JOIN sectors s
                ON o.sector_id = s.sector_id
            LEFT JOIN sub_sectors ss
                ON o.sub_sector_id = ss.sub_sector_id
            LEFT JOIN ownership_types ot
                ON o.ownership_id = ot.ownership_id
            LEFT JOIN project_types pt
                ON o.project_type_id = pt.project_type_id
            LEFT JOIN investor_types it
                ON o.investor_type_id = it.investor_type_id
            LEFT JOIN contract_types ct
                ON o.contract_type_id = ct.contract_type_id
            LEFT JOIN entities e
                ON o.provider_entity_id = e.entity_id
            LEFT JOIN project_scales ps
                ON o.project_scale_id = ps.project_scale_id
            LEFT JOIN opportunity_statuses os
                ON o.status_id = os.status_id
            LEFT JOIN financial_data f
                ON o.opportunity_id = f.opportunity_id
            LEFT JOIN currencies c
                ON f.currency_id = c.currency_id
            LEFT JOIN financing_models fm
                ON f.financing_model_id = fm.financing_model_id
            LEFT JOIN locations l
                ON o.location_id = l.location_id
            LEFT JOIN area_units au
                ON l.area_unit_id = au.area_unit_id
            LEFT JOIN project_details pd
                ON o.opportunity_id = pd.opportunity_id
            LEFT JOIN employment emp
                ON o.opportunity_id = emp.opportunity_id
            WHERE o.is_active = TRUE
            ORDER BY o.opportunity_id
            """
        )

        result = []

        for row in rows:
            estimated_cost = (
                float(row["estimated_cost"])
                if row["estimated_cost"] is not None
                else 0
            )

            investment_value_million = (
                estimated_cost / 1_000_000
            )

            area = ""

            if row["area_value"] is not None:
                try:
                    area_value = float(row["area_value"])

                    area = (
                        f"{area_value:,.0f} "
                        f"{row['area_unit_name_ar'] or ''}"
                    ).strip()

                except (ValueError, TypeError):
                    area = ""

            description = (
                row["project_description_ar"]
                or "لا يوجد وصف تفصيلي متوفر حاليًا لهذه الفرصة."
            )

            opportunity_id = row["opportunity_id"]

            readiness_checks = fetch_one(
                """
                SELECT
                    EXISTS (
                        SELECT 1
                        FROM financial_data
                        WHERE opportunity_id = :id
                    ) AS has_financial,

                    EXISTS (
                        SELECT 1
                        FROM locations
                        WHERE opportunity_id = :id
                    ) AS has_location,

                    EXISTS (
                        SELECT 1
                        FROM project_details
                        WHERE opportunity_id = :id
                    ) AS has_details,

                    EXISTS (
                        SELECT 1
                        FROM employment
                        WHERE opportunity_id = :id
                    ) AS has_employment,

                    EXISTS (
                        SELECT 1
                        FROM opportunity_infrastructure
                        WHERE opportunity_id = :id
                    ) AS has_infrastructure,

                    EXISTS (
                        SELECT 1
                        FROM opportunity_site_features
                        WHERE opportunity_id = :id
                    ) AS has_site_features,

                    EXISTS (
                        SELECT 1
                        FROM opportunity_approvals
                        WHERE opportunity_id = :id
                    ) AS has_approvals,

                    EXISTS (
                        SELECT 1
                        FROM opportunity_attachments
                        WHERE opportunity_id = :id
                    ) AS has_attachments
                """,
                {
                    "id": opportunity_id,
                },
            )

            readiness_fields = [
                readiness_checks["has_financial"],
                readiness_checks["has_location"],
                readiness_checks["has_details"],
                readiness_checks["has_employment"],
                readiness_checks["has_infrastructure"],
                readiness_checks["has_site_features"],
                readiness_checks["has_approvals"],
                readiness_checks["has_attachments"],
            ]

            readiness = round(
                (
                    sum(
                        1
                        for value in readiness_fields
                        if value
                    )
                    / len(readiness_fields)
                )
                * 100
            )

            result.append(
                {
                    "code": row["opportunity_code"],
                    "name": row["name_ar"],
                    "nameEn": row["name_en"],
                    "sector": (
                        row["sector_name_ar"]
                        or "غير محدد"
                    ),
                    "subSector": (
                        row["sub_sector_name_ar"]
                        or "غير محدد"
                    ),
                    "location": (
                        row["location_description_ar"]
                        or "غير محدد"
                    ),
                    "status": (
                        row["status_name_ar"]
                        or "غير محدد"
                    ),
                    "value": investment_value_million,
                    "estimatedCost": estimated_cost,
                    "currency": (
                        row["currency_name_ar"]
                        or ""
                    ),
                    "description": description,
                    "projectType": (
                        row["project_type_name_ar"]
                        or "غير محدد"
                    ),
                    "projectScale": (
                        row["project_scale_name_ar"]
                        or "غير محدد"
                    ),
                    "ownership": (
                        row["ownership_name_ar"]
                        or "غير محدد"
                    ),
                    "investorType": (
                        row["investor_type_name_ar"]
                        or "غير محدد"
                    ),
                    "contractType": (
                        row["contract_type_name_ar"]
                        or "غير محدد"
                    ),
                    "providerEntity": (
                        row["provider_entity_name_ar"]
                        or "غير محدد"
                    ),
                    "area": area,
                    "latitude": row["latitude"],
                    "longitude": row["longitude"],
                    "mapUrl": row["map_url"],
                    "totalJobs": row["total_jobs"] or 0,
                    "readiness": readiness,
                    "investmentModel": (
                        row["financing_model_name_ar"]
                        or "غير محدد"
                    ),
                }
            )

        return result

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve investment opportunities",
        ) from error


# ------------------------------------------------------------------
# Opportunity By Code
# ------------------------------------------------------------------

@app.get("/api/opportunities/{code}")
def get_opportunity(code: str):
    try:
        result = get_opportunity_by_code(code)

        if not result:
            raise HTTPException(
                status_code=404,
                detail="Opportunity not found",
            )

        return result

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve opportunity",
        ) from error


# ------------------------------------------------------------------
# Financial Data
# ------------------------------------------------------------------

@app.get("/api/financial-data")
def get_financial_data():
    try:
        return fetch_all(
            """
            SELECT
                f.*,
                c.code AS currency_code,
                c.name_ar AS currency_name_ar,
                c.name_en AS currency_name_en,
                c.symbol AS currency_symbol,
                fm.name_ar AS financing_model_name_ar,
                fm.name_en AS financing_model_name_en
            FROM financial_data f
            LEFT JOIN currencies c
                ON f.currency_id = c.currency_id
            LEFT JOIN financing_models fm
                ON f.financing_model_id =
                   fm.financing_model_id
            ORDER BY f.financial_id
            """
        )

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve financial data",
        ) from error


# ------------------------------------------------------------------
# Financial Data By Opportunity
# ------------------------------------------------------------------

@app.get("/api/financial/{opportunity_id}")
def get_financial(opportunity_id: str):
    try:
        financial = fetch_one(
            """
            SELECT
                f.*,
                c.code AS currency_code,
                c.name_ar AS currency_name_ar,
                c.name_en AS currency_name_en,
                c.symbol AS currency_symbol,
                fm.name_ar AS financing_model_name_ar,
                fm.name_en AS financing_model_name_en
            FROM financial_data f
            LEFT JOIN currencies c
                ON f.currency_id = c.currency_id
            LEFT JOIN financing_models fm
                ON f.financing_model_id =
                   fm.financing_model_id
            WHERE f.opportunity_id = :id
            LIMIT 1
            """,
            {
                "id": opportunity_id,
            },
        )

        if not financial:
            raise HTTPException(
                status_code=404,
                detail="Financial data not found",
            )

        return financial

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve financial data",
        ) from error


# ------------------------------------------------------------------
# Administrative Units
# ------------------------------------------------------------------

@app.get("/api/administrative-units")
def get_administrative_units():
    try:
        return fetch_all(
            """
            SELECT
                au.*,
                aut.name_ar AS unit_type_name_ar,
                aut.name_en AS unit_type_name_en
            FROM administrative_units au
            LEFT JOIN administrative_unit_types aut
                ON au.unit_type_id =
                   aut.unit_type_id
            ORDER BY au.administrative_unit_id
            """
        )

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve administrative units",
        ) from error


# ------------------------------------------------------------------
# Infrastructure Types
# ------------------------------------------------------------------

@app.get("/api/infrastructure")
def get_infrastructure():
    try:
        return fetch_all(
            """
            SELECT *
            FROM infrastructure_types
            WHERE is_active = TRUE
            ORDER BY infrastructure_type_id
            """
        )

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve infrastructure types",
        ) from error


# ------------------------------------------------------------------
# AI Opportunity Data
# ------------------------------------------------------------------

@app.get("/api/ai/opportunity/{opportunity_code}")
def get_ai_opportunity_data(
    opportunity_code: str,
):
    query = text(
        """
        SELECT
            io.opportunity_id,
            io.opportunity_code,
            io.name_ar,
            io.name_en,
            io.sector_id,
            io.sub_sector_id,
            io.project_type_id,
            io.project_scale_id,
            io.investor_type_id,
            io.contract_type_id,
            io.ownership_id,
            io.provider_entity_id,
            io.status_id
        FROM investment_opportunities io
        WHERE io.opportunity_code = :opportunity_code
        LIMIT 1
        """
    )

    try:
        with engine.connect() as connection:
            result = connection.execute(
                query,
                {
                    "opportunity_code": opportunity_code,
                },
            ).mappings().first()

        if not result:
            raise HTTPException(
                status_code=404,
                detail="Opportunity not found",
            )

        return {
            "success": True,
            "opportunity": dict(result),
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve AI opportunity data",
        ) from error


# ------------------------------------------------------------------
# Cache Compatibility Endpoint
# ------------------------------------------------------------------

@app.get("/api/cache/clear")
def clear_sheet_cache():
    return {
        "status": "ok",
        "message": (
            "PostgreSQL mode - "
            "no Google Sheets API cache is used"
        ),
    }