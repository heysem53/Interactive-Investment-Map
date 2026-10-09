import csv
import io
import requests

from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.database import engine


# =========================================================
# Configuration
# =========================================================

SHEET_ID = "103OCXrU9jH8C89VLMt4ZDUiepugJFNjsbUHleLVHLgo"


# =========================================================
# Google Sheets - Import Order
# =========================================================

SHEETS = [
    # -----------------------------------------------------
    # Reference tables
    # -----------------------------------------------------

    "administrative_unit_types",
    "approval_types",
    "area_units",
    "attachment_types",
    "capacity_units",
    "contract_types",
    "currencies",
    "entity_relation_types",
    "entity_types",
    "financing_models",
    "infrastructure_types",
    "investor_types",
    "opportunity_statuses",
    "ownership_types",
    "project_scales",
    "project_types",
    "sectors",
    "site_features",
    "sub_sectors",

    # -----------------------------------------------------
    # Administrative / entities
    # -----------------------------------------------------

    "administrative_units",
    "entities",

    # -----------------------------------------------------
    # Main opportunities
    # -----------------------------------------------------

    "investment_opportunities",

    # -----------------------------------------------------
    # Opportunity related tables
    # -----------------------------------------------------

    "locations",
    "project_details",
    "financial_data",
    "employment",

    "opportunity_approvals",
    "opportunity_site_features",
    "opportunity_infrastructure",
    "opportunity_entities",
    "opportunity_investors",
    "opportunity_contracts",
    "opportunity_attachments",
]


# =========================================================
# Google Sheets Reader
# =========================================================

def get_sheet_data(sheet_name: str):

    url = (
        f"https://docs.google.com/spreadsheets/d/"
        f"{SHEET_ID}/gviz/tq"
        f"?tqx=out:csv"
        f"&sheet={requests.utils.quote(sheet_name)}"
    )

    response = requests.get(
        url,
        headers={
            "User-Agent": "Mozilla/5.0"
        },
        timeout=30,
    )

    response.raise_for_status()

    reader = csv.DictReader(
        io.StringIO(response.text)
    )

    return list(reader)


# =========================================================
# Clean Value
# =========================================================

def clean_value(value):

    if value is None:
        return None

    value = str(value).strip()

    if value == "":
        return None

    if value.lower() in {
        "null",
        "none",
        "nan",
    }:
        return None

    return value


# =========================================================
# Clean Row
# =========================================================

def clean_row(row):

    return {
        key.strip(): clean_value(value)
        for key, value in row.items()
        if key is not None
    }


# =========================================================
# Database Helpers
# =========================================================

def get_table_columns(connection, table_name):

    result = connection.execute(
        text("""
            SELECT
                column_name,
                data_type,
                is_nullable,
                column_default
            FROM information_schema.columns
            WHERE table_schema = 'public'
              AND table_name = :table_name
            ORDER BY ordinal_position
        """),
        {
            "table_name": table_name
        },
    )

    return result.fetchall()


def get_primary_key(connection, table_name):

    result = connection.execute(
        text("""
            SELECT
                kcu.column_name
            FROM information_schema.table_constraints tc
            JOIN information_schema.key_column_usage kcu
                ON tc.constraint_name = kcu.constraint_name
               AND tc.table_schema = kcu.table_schema
               AND tc.table_name = kcu.table_name
            WHERE tc.table_schema = 'public'
              AND tc.table_name = :table_name
              AND tc.constraint_type = 'PRIMARY KEY'
            ORDER BY kcu.ordinal_position
        """),
        {
            "table_name": table_name
        },
    )

    rows = result.fetchall()

    if not rows:
        return None

    return rows[0][0]


def table_exists(connection, table_name):

    result = connection.execute(
        text("""
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables
                WHERE table_schema = 'public'
                  AND table_name = :table_name
            )
        """),
        {
            "table_name": table_name
        },
    )

    return bool(result.scalar())


# =========================================================
# Value Conversion
# =========================================================

def convert_value(value, data_type):

    value = clean_value(value)

    if value is None:
        return None

    try:

        if data_type in (
            "integer",
            "bigint",
            "smallint",
        ):
            return int(float(value))

        if data_type in (
            "numeric",
            "decimal",
            "real",
            "double precision",
        ):
            return float(value)

        if data_type == "boolean":

            value_lower = str(value).lower()

            if value_lower in (
                "true",
                "1",
                "yes",
                "y",
                "نعم",
                "متاح",
                "active",
            ):
                return True

            if value_lower in (
                "false",
                "0",
                "no",
                "n",
                "لا",
                "غير متاح",
                "inactive",
            ):
                return False

            return None

    except (
        ValueError,
        TypeError,
    ):

        return value

    return value


# =========================================================
# Prepare Row
# =========================================================

def prepare_row(
    row,
    columns,
):

    column_info = {
        column[0]: column
        for column in columns
    }

    prepared = {}

    for key, value in row.items():

        if key not in column_info:
            continue

        data_type = column_info[key][1]

        prepared[key] = convert_value(
            value,
            data_type,
        )

    return prepared


# =========================================================
# Detect Empty Row
# =========================================================

def is_empty_row(row):

    if not row:
        return True

    values = [
        clean_value(value)
        for value in row.values()
    ]

    return all(
        value is None
        for value in values
    )


# =========================================================
# Import One Table
# =========================================================

def import_table(
    connection,
    table_name,
    rows,
):

    print()
    print(
        f"Importing: {table_name}"
    )

    # -----------------------------------------------------
    # Check table
    # -----------------------------------------------------

    if not table_exists(
        connection,
        table_name,
    ):

        print(
            "   Table does not exist - SKIPPED"
        )

        return 0, len(rows)

    # -----------------------------------------------------
    # Get columns
    # -----------------------------------------------------

    columns = get_table_columns(
        connection,
        table_name,
    )

    if not columns:

        print(
            "   No columns found - SKIPPED"
        )

        return 0, len(rows)

    database_columns = {
        column[0]
        for column in columns
    }

    primary_key = get_primary_key(
        connection,
        table_name,
    )

    if not primary_key:

        print(
            "   No primary key - SKIPPED"
        )

        return 0, len(rows)

    # -----------------------------------------------------
    # Counters
    # -----------------------------------------------------

    imported = 0
    skipped = 0

    skip_reasons = {}

    # -----------------------------------------------------
    # Process rows
    # -----------------------------------------------------

    for original_row in rows:

        row = clean_row(
            original_row
        )

        # -------------------------------------------------
        # Empty row
        # -------------------------------------------------

        if is_empty_row(row):

            skipped += 1

            skip_reasons[
                "empty row"
            ] = (
                skip_reasons.get(
                    "empty row",
                    0
                )
                + 1
            )

            continue

        # -------------------------------------------------
        # Primary key
        # -------------------------------------------------

        primary_key_value = clean_value(
            row.get(primary_key)
        )

        # -------------------------------------------------
        # IMPORTANT:
        # Ignore rows without PK
        #
        # Example:
        # opportunity_investors
        #
        # opportunity_investor_id = NULL
        # opportunity_id = 26
        #
        # This is a blank/incomplete row
        # and must not be inserted.
        # -------------------------------------------------

        if primary_key_value is None:

            skipped += 1

            skip_reasons[
                f"missing primary key: {primary_key}"
            ] = (
                skip_reasons.get(
                    f"missing primary key: {primary_key}",
                    0
                )
                + 1
            )

            continue

        # -------------------------------------------------
        # Keep only DB columns
        # -------------------------------------------------

        row = {
            key: value
            for key, value in row.items()
            if key in database_columns
        }

        # -------------------------------------------------
        # Convert data types
        # -------------------------------------------------

        converted = prepare_row(
            row,
            columns,
        )

        # -------------------------------------------------
        # Check PK after conversion
        # -------------------------------------------------

        if converted.get(primary_key) is None:

            skipped += 1

            skip_reasons[
                f"invalid primary key: {primary_key}"
            ] = (
                skip_reasons.get(
                    f"invalid primary key: {primary_key}",
                    0
                )
                + 1
            )

            continue

        # -------------------------------------------------
        # Build SQL
        # -------------------------------------------------

        column_names = list(
            converted.keys()
        )

        quoted_columns = ", ".join(
            f'"{column}"'
            for column in column_names
        )

        parameters = ", ".join(
            f":{column}"
            for column in column_names
        )

        update_columns = [
            column
            for column in column_names
            if column != primary_key
        ]

        # -------------------------------------------------
        # INSERT only PK
        # -------------------------------------------------

        if not update_columns:

            sql = f"""
                INSERT INTO "{table_name}"
                ({quoted_columns})
                VALUES ({parameters})
                ON CONFLICT ("{primary_key}")
                DO NOTHING
            """

        else:

            update_clause = ", ".join(
                f'"{column}" = EXCLUDED."{column}"'
                for column in update_columns
            )

            sql = f"""
                INSERT INTO "{table_name}"
                ({quoted_columns})
                VALUES ({parameters})
                ON CONFLICT ("{primary_key}")
                DO UPDATE SET
                    {update_clause}
            """

        # -------------------------------------------------
        # Execute
        # -------------------------------------------------

        try:

            connection.execute(
                text(sql),
                converted,
            )

            imported += 1

        except Exception as error:

            print()
            print(
                f"   ERROR in row "
                f"{primary_key}="
                f"{converted.get(primary_key)}"
            )

            print(
                f"   {type(error).__name__}: "
                f"{error}"
            )

            raise

    # -----------------------------------------------------
    # Summary
    # -----------------------------------------------------

    print(
        f"   Google Sheets rows : {len(rows)}"
    )

    print(
        f"   Imported/updated   : {imported}"
    )

    print(
        f"   Skipped            : {skipped}"
    )

    if skip_reasons:

        print(
            "   Skip reasons:"
        )

        for reason, count in skip_reasons.items():

            print(
                f"      - {reason}: {count}"
            )

    return imported, skipped


# =========================================================
# Test Database
# =========================================================

def test_database():

    with engine.connect() as connection:

        result = connection.execute(
            text("""
                SELECT
                    current_database(),
                    version()
            """)
        )

        row = result.fetchone()

        print(
            f"PostgreSQL connection OK: "
            f"{row[0]}"
        )

        print(
            f"PostgreSQL version: "
            f"{row[1]}"
        )


# =========================================================
# Test Google Sheets
# =========================================================

def test_google_sheets():

    print(
        "Testing Google Sheets connection..."
    )

    rows = get_sheet_data(
        "investment_opportunities"
    )

    print(
        f"Google Sheets OK: "
        f"{len(rows)} opportunities found"
    )

    if rows:

        print(
            "Columns:"
        )

        print(
            list(rows[0].keys())
        )


# =========================================================
# Import All Sheets
# =========================================================

def run_import():

    print("=" * 70)
    print(
        "Investment AI - Google Sheets -> PostgreSQL Import"
    )
    print("=" * 70)

    # -----------------------------------------------------
    # Database connection
    # -----------------------------------------------------

    test_database()

    print()

    # -----------------------------------------------------
    # Google Sheets connection
    # -----------------------------------------------------

    test_google_sheets()

    print()
    print("=" * 70)
    print("Starting full import...")
    print("=" * 70)

    total_imported = 0
    total_skipped = 0

    # -----------------------------------------------------
    # One transaction for the entire import
    # -----------------------------------------------------

    with engine.begin() as connection:

        for table_name in SHEETS:

            print()

            print(
                "-" * 70
            )

            print(
                f"Reading Google Sheet: "
                f"{table_name}"
            )

            rows = get_sheet_data(
                table_name
            )

            print(
                f"Rows received: "
                f"{len(rows)}"
            )

            imported, skipped = import_table(
                connection,
                table_name,
                rows,
            )

            total_imported += imported
            total_skipped += skipped

    # -----------------------------------------------------
    # Final result
    # -----------------------------------------------------

    print()
    print("=" * 70)
    print("IMPORT COMPLETED SUCCESSFULLY")
    print("=" * 70)

    print(
        f"Total imported/updated : "
        f"{total_imported}"
    )

    print(
        f"Total skipped          : "
        f"{total_skipped}"
    )

    print("=" * 70)


# =========================================================
# Main
# =========================================================

if __name__ == "__main__":

    try:

        run_import()

    except KeyboardInterrupt:

        print()
        print(
            "IMPORT CANCELLED BY USER"
        )

    except Exception as error:

        print()
        print("=" * 70)
        print("IMPORT FAILED")
        print("=" * 70)

        print(
            f"{type(error).__name__}: "
            f"{error}"
        )

        print()
        print(
            "No changes were committed."
        )

        raise