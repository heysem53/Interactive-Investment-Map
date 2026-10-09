from ..database import engine
from ..ai.analyzer import analyze_readiness
from sqlalchemy import text


def fetch_all(query: str, params: dict | None = None):
    with engine.connect() as connection:
        result = connection.execute(
            text(query),
            params or {},
        )

        return [
            dict(row._mapping)
            for row in result.fetchall()
        ]


def fetch_one(query: str, params: dict | None = None):
    with engine.connect() as connection:
        result = connection.execute(
            text(query),
            params or {},
        )

        row = result.fetchone()

        if not row:
            return None

        return dict(row._mapping)


# =========================================================
# Opportunity By Code
# =========================================================
def get_opportunity_by_code(
    code: str
):
    opportunity = fetch_one(
        """
        SELECT *
        FROM investment_opportunities
        WHERE opportunity_code = :code
          AND is_active = TRUE
        LIMIT 1
        """,
        {
            "code": code
        },
    )

    if not opportunity:
        return None

    opportunity_id = opportunity[
        "opportunity_id"
    ]

    # =========================================================
    # References
    # =========================================================
    references = fetch_one(
        """
        SELECT
            s.sector_id,
            s.name_ar AS sector_name_ar,
            s.name_en AS sector_name_en,
            ss.sub_sector_id,
            ss.name_ar AS sub_sector_name_ar,
            ss.name_en AS sub_sector_name_en,
            pt.project_type_id,
            pt.name_ar AS project_type_name_ar,
            pt.name_en AS project_type_name_en,
            ps.project_scale_id,
            ps.name_ar AS project_scale_name_ar,
            ps.name_en AS project_scale_name_en,
            it.investor_type_id,
            it.name_ar AS investor_type_name_ar,
            it.name_en AS investor_type_name_en,
            ct.contract_type_id,
            ct.name_ar AS contract_type_name_ar,
            ct.name_en AS contract_type_name_en,
            os.status_id,
            os.name_ar AS status_name_ar,
            os.name_en AS status_name_en,
            ot.ownership_id,
            ot.name_ar AS ownership_name_ar,
            ot.name_en AS ownership_name_en,
            e.entity_id AS provider_entity_id,
            e.name_ar AS provider_entity_name_ar,
            e.name_en AS provider_entity_name_en,
            et.entity_type_id,
            et.name_ar AS provider_entity_type_name_ar,
            et.name_en AS provider_entity_type_name_en
        FROM investment_opportunities o
        LEFT JOIN sectors s
            ON o.sector_id = s.sector_id
        LEFT JOIN sub_sectors ss
            ON o.sub_sector_id = ss.sub_sector_id
        LEFT JOIN project_types pt
            ON o.project_type_id = pt.project_type_id
        LEFT JOIN project_scales ps
            ON o.project_scale_id = ps.project_scale_id
        LEFT JOIN investor_types it
            ON o.investor_type_id = it.investor_type_id
        LEFT JOIN contract_types ct
            ON o.contract_type_id = ct.contract_type_id
        LEFT JOIN opportunity_statuses os
            ON o.status_id = os.status_id
        LEFT JOIN ownership_types ot
            ON o.ownership_id = ot.ownership_id
        LEFT JOIN entities e
            ON o.provider_entity_id = e.entity_id
        LEFT JOIN entity_types et
            ON e.entity_type_id = et.entity_type_id
        WHERE o.opportunity_id = :id
        """,
        {
            "id": opportunity_id
        },
    )

    # =========================================================
    # Financial
    # =========================================================
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
            ON f.financing_model_id = fm.financing_model_id
        WHERE f.opportunity_id = :id
        LIMIT 1
        """,
        {
            "id": opportunity_id
        },
    )

    # =========================================================
    # Location
    # =========================================================
    location = fetch_one(
        """
        SELECT
            l.*,
            au.name_ar AS area_unit_name_ar,
            au.name_en AS area_unit_name_en,
            au.symbol AS area_unit_symbol,
            ad.name_ar AS administrative_unit_name_ar,
            ad.name_en AS administrative_unit_name_en,
            adt.name_ar AS administrative_unit_type_name_ar,
            adt.name_en AS administrative_unit_type_name_en
        FROM locations l
        LEFT JOIN area_units au
            ON l.area_unit_id = au.area_unit_id
        LEFT JOIN administrative_units ad
            ON l.administrative_unit_id =
               ad.administrative_unit_id
        LEFT JOIN administrative_unit_types adt
            ON ad.unit_type_id =
               adt.unit_type_id
        WHERE l.opportunity_id = :id
        LIMIT 1
        """,
        {
            "id": opportunity_id
        },
    )

    # =========================================================
    # Project Details
    # =========================================================
    project_details = fetch_one(
        """
        SELECT
            pd.*,
            cu.name_ar AS capacity_unit_name_ar,
            cu.name_en AS capacity_unit_name_en,
            cu.symbol AS capacity_unit_symbol
        FROM project_details pd
        LEFT JOIN capacity_units cu
            ON pd.capacity_unit_id =
               cu.capacity_unit_id
        WHERE pd.opportunity_id = :id
        LIMIT 1
        """,
        {
            "id": opportunity_id
        },
    )

    # =========================================================
    # Employment
    # =========================================================
    employment = fetch_one(
        """
        SELECT *
        FROM employment
        WHERE opportunity_id = :id
        LIMIT 1
        """,
        {
            "id": opportunity_id
        },
    )

    # =========================================================
    # Infrastructure
    # =========================================================
    infrastructure = fetch_all(
        """
        SELECT
            oi.*,
            it.name_ar AS infrastructure_type_name_ar,
            it.name_en AS infrastructure_type_name_en,
            it.category AS infrastructure_category
        FROM opportunity_infrastructure oi
        LEFT JOIN infrastructure_types it
            ON oi.infrastructure_type_id =
               it.infrastructure_type_id
        WHERE oi.opportunity_id = :id
        ORDER BY oi.opportunity_infrastructure_id
        """,
        {
            "id": opportunity_id
        },
    )

    # =========================================================
    # Site Features
    # =========================================================
    site_features = fetch_all(
        """
        SELECT
            osf.*,
            sf.name_ar AS feature_name_ar,
            sf.name_en AS feature_name_en,
            sf.description_ar AS feature_description_ar,
            sf.description_en AS feature_description_en
        FROM opportunity_site_features osf
        LEFT JOIN site_features sf
            ON osf.site_feature_id =
               sf.feature_id
        WHERE osf.opportunity_id = :id
        ORDER BY osf.opportunity_site_feature_id
        """,
        {
            "id": opportunity_id
        },
    )

    # =========================================================
    # Approvals
    # =========================================================
    approvals = fetch_all(
        """
        SELECT
            oa.*,
            at.name_ar AS approval_type_name_ar,
            at.name_en AS approval_type_name_en,
            e.name_ar AS issuing_entity_name_ar,
            e.name_en AS issuing_entity_name_en
        FROM opportunity_approvals oa
        LEFT JOIN approval_types at
            ON oa.approval_type_id =
               at.approval_type_id
        LEFT JOIN entities e
            ON oa.issuing_entity_id =
               e.entity_id
        WHERE oa.opportunity_id = :id
        ORDER BY oa.opportunity_approval_id
        """,
        {
            "id": opportunity_id
        },
    )

    # =========================================================
    # Entities
    # =========================================================
    entities = fetch_all(
        """
        SELECT
            oe.*,
            e.name_ar AS entity_name_ar,
            e.name_en AS entity_name_en,
            e.phone AS entity_phone,
            e.email AS entity_email,
            et.name_ar AS entity_type_name_ar,
            et.name_en AS entity_type_name_en,
            ert.name_ar AS relation_type_name_ar,
            ert.name_en AS relation_type_name_en
        FROM opportunity_entities oe
        LEFT JOIN entities e
            ON oe.entity_id = e.entity_id
        LEFT JOIN entity_types et
            ON e.entity_type_id =
               et.entity_type_id
        LEFT JOIN entity_relation_types ert
            ON oe.relation_type_id =
               ert.relation_type_id
        WHERE oe.opportunity_id = :id
        ORDER BY oe.opportunity_entity_id
        """,
        {
            "id": opportunity_id
        },
    )

    # =========================================================
    # Investors
    # =========================================================
    investors = fetch_all(
        """
        SELECT
            oi.*,
            it.name_ar AS investor_type_name_ar,
            it.name_en AS investor_type_name_en,
            e.name_ar AS entity_name_ar,
            e.name_en AS entity_name_en
        FROM opportunity_investors oi
        LEFT JOIN investor_types it
            ON oi.investor_type_id =
               it.investor_type_id
        LEFT JOIN entities e
            ON oi.entity_id =
               e.entity_id
        WHERE oi.opportunity_id = :id
        ORDER BY oi.opportunity_investor_id
        """,
        {
            "id": opportunity_id
        },
    )

    # =========================================================
    # Contracts
    # =========================================================
    contracts = fetch_all(
        """
        SELECT
            oc.*,
            ct.name_ar AS contract_type_name_ar,
            ct.name_en AS contract_type_name_en
        FROM opportunity_contracts oc
        LEFT JOIN contract_types ct
            ON oc.contract_type_id =
               ct.contract_type_id
        WHERE oc.opportunity_id = :id
        ORDER BY oc.opportunity_contract_id
        """,
        {
            "id": opportunity_id
        },
    )

    # =========================================================
    # Attachments
    # =========================================================
    attachments = fetch_all(
        """
        SELECT
            oa.*,
            at.name_ar AS attachment_type_name_ar,
            at.name_en AS attachment_type_name_en
        FROM opportunity_attachments oa
        LEFT JOIN attachment_types at
            ON oa.attachment_type_id =
               at.attachment_type_id
        WHERE oa.opportunity_id = :id
        ORDER BY oa.opportunity_attachment_id
        """,
        {
            "id": opportunity_id
        },
    )

    # =========================================================
    # Unified Investment Readiness
    #
    # Uses the exact same readiness engine used by AI analysis.
    # This prevents OpportunityDetails from calculating a
    # different readiness percentage.
    # =========================================================
    readiness = analyze_readiness(
        {
            "opportunity": opportunity,
            "references": references,
            "financial": financial,
            "location": location,
            "project_details": project_details,
            "employment": employment,
            "infrastructure": infrastructure,
            "site_features": site_features,
            "approvals": approvals,
            "entities": entities,
            "investors": investors,
            "contracts": contracts,
            "attachments": attachments,
        }
    )

    # =========================================================
    # Final Response
    # =========================================================
    return {
        "opportunity":
            opportunity,
        "references":
            references,
        "financial":
            financial,
        "location":
            location,
        "project_details":
            project_details,
        "employment":
            employment,
        "infrastructure":
            infrastructure,
        "site_features":
            site_features,
        "approvals":
            approvals,
        "entities":
            entities,
        "investors":
            investors,
        "contracts":
            contracts,
        "attachments":
            attachments,

        # Unified readiness from AI engine
        "readiness":
            readiness,
    }