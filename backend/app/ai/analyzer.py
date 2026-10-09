from typing import Dict, Any, List, Optional

from .scoring import (
    calculate_investment_score,
    get_investment_grade,
    clamp_score,
)

from .schemas import (
    AIAnalysisResult,
    AIScoreBreakdown,
)


# =========================================================
# Helpers
# =========================================================

def normalize_text(value: Any) -> str:
    """
    Normalize text values for Arabic and English comparisons.
    """

    if value is None:
        return ""

    return " ".join(
        str(value).strip().lower().split()
    )


def to_float(value: Any) -> Optional[float]:
    """
    Safely convert a value to float.
    """

    if value is None or value == "":
        return None

    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def first_value(
    data: Dict[str, Any],
    keys: List[str],
) -> Any:
    """
    Return the first non-empty value from a list of keys.
    """

    if not isinstance(data, dict):
        return None

    for key in keys:
        value = data.get(key)

        if value is not None and value != "":
            return value

    return None


def has_text(
    data: Dict[str, Any],
    keys: List[str],
) -> bool:
    """
    Check whether at least one text field contains data.
    """

    value = first_value(
        data,
        keys,
    )

    return bool(
        normalize_text(value)
    )


def is_true(value: Any) -> bool:
    """
    Safely interpret boolean-like database values.
    """

    if value is True:
        return True

    if isinstance(value, str):

        return normalize_text(value) in {
            "true",
            "yes",
            "1",
            "نعم",
            "متاح",
            "متوفرة",
            "متوفر",
            "قابل للتوسع",
        }

    if isinstance(value, (int, float)):
        return value == 1

    return False


def status_is_available(status: Any) -> bool:
    """
    Detect infrastructure/document availability.
    """

    value = normalize_text(status)

    return value in {
        "available",
        "available now",
        "available for review",
        "existing",
        "متوفر",
        "متاحة",
        "متاح",
        "متوفرة",
        "قائم",
        "موجود",
        "موجودة",
    }


def status_is_pending(status: Any) -> bool:
    """
    Detect pending approval/status values.
    """

    value = normalize_text(status)

    return (
        "pending" in value
        or "awaiting" in value
        or "waiting" in value
        or "قيد الانتظار" in value
        or "معلق" in value
        or "بانتظار" in value
        or "قيد الاستكمال" in value
        or "قيد الإجراء" in value
        or "pending completion" in value
        or "بحاجة لاستكمال" in value
    )


def status_is_completed(status: Any) -> bool:
    """
    Detect completed approval values.
    """

    value = normalize_text(status)

    return value in {
        "approved",
        "completed",
        "complete",
        "approved and completed",
        "done",
        "موافق عليه",
        "معتمد",
        "مكتمل",
        "كامل",
        "منجز",
    }


def unique_list(
    values: List[str],
) -> List[str]:
    """
    Remove duplicates while preserving order.
    """

    return list(
        dict.fromkeys(
            value
            for value in values
            if value
        )
    )


# =========================================================
# Financial Analysis
# =========================================================

def analyze_financial(
    data: Dict[str, Any],
) -> float:
    """
    Calculate financial attractiveness score
    from real financial data.

    The score considers:
    - expected return
    - annual investment return
    - investment period
    - investment cost
    - financing model
    - financial documentation
    """

    financial = data.get("financial") or {}
    references = data.get("references") or {}

    score = 50.0

    expected_return = to_float(
        financial.get("expected_return_rate")
    )

    annual_return = to_float(
        financial.get("annual_investment_return")
    )

    investment_period = to_float(
        financial.get("investment_period_years")
    )

    investment_cost = to_float(
        first_value(
            financial,
            [
                "investment_cost",
                "total_investment_cost",
                "estimated_investment_cost",
                "capital_cost",
                "estimated_cost",
            ],
        )
    )

    financing_model = first_value(
        financial,
        [
            "financing_model_name_en",
            "financing_model_name_ar",
            "financing_model",
        ],
    )

    if financing_model is None:

        financing_model = first_value(
            references,
            [
                "financing_model_name_en",
                "financing_model_name_ar",
            ],
        )

    # -----------------------------------------------------
    # Expected Return
    # -----------------------------------------------------

    if expected_return is not None:

        if expected_return >= 15:
            score += 25

        elif expected_return >= 12:
            score += 20

        elif expected_return >= 10:
            score += 15

        elif expected_return >= 7:
            score += 5

        else:
            score -= 10

    # -----------------------------------------------------
    # Annual Return
    # -----------------------------------------------------

    if annual_return is not None:

        if annual_return >= 15:
            score += 15

        elif annual_return >= 10:
            score += 10

        elif annual_return >= 7:
            score += 5

        elif annual_return < 5:
            score -= 5

    # -----------------------------------------------------
    # Investment Period
    # -----------------------------------------------------

    if investment_period is not None:

        if investment_period <= 10:
            score += 10

        elif investment_period <= 20:
            score += 5

        elif investment_period > 30:
            score -= 5

    # -----------------------------------------------------
    # Investment Cost
    # -----------------------------------------------------

    if investment_cost is not None:

        if investment_cost > 0:
            score += 5

    # -----------------------------------------------------
    # Financing Model
    # -----------------------------------------------------

    if financing_model:
        score += 5

    # -----------------------------------------------------
    # Financial Documentation
    # -----------------------------------------------------

    notes = normalize_text(
        first_value(
            financial,
            [
                "notes_en",
                "notes_ar",
                "financial_notes",
            ],
        )
    )

    if (
        "feasibility" in notes
        or "دراسة جدوى" in notes
    ):
        score -= 5

    return clamp_score(score)


# =========================================================
# Location Analysis
# =========================================================

def analyze_location(
    data: Dict[str, Any],
) -> float:
    """
    Calculate location attractiveness score.
    """

    location = data.get("location") or {}
    site_features = data.get("site_features") or []

    score = 50.0

    area = to_float(
        location.get("area_value")
    )

    expandable = is_true(
        location.get("expandable")
    )

    expansion_area = to_float(
        location.get("expansion_area_value")
    )

    latitude = location.get("latitude")
    longitude = location.get("longitude")

    # -----------------------------------------------------
    # Area
    # -----------------------------------------------------

    if area is not None:

        if area >= 100000:
            score += 20

        elif area >= 50000:
            score += 15

        elif area >= 10000:
            score += 10

        elif area > 0:
            score += 5

    # -----------------------------------------------------
    # Expansion
    # -----------------------------------------------------

    if expandable:

        score += 15

        if expansion_area and expansion_area > 0:
            score += 5

    # -----------------------------------------------------
    # Coordinates
    # -----------------------------------------------------

    if latitude is not None and longitude is not None:
        score += 10

    # -----------------------------------------------------
    # Site Features
    # -----------------------------------------------------

    meaningful_features = 0

    for feature in site_features:

        if not isinstance(feature, dict):
            continue

        feature_value = first_value(
            feature,
            [
                "feature_value_ar",
                "feature_value_en",
                "feature_value",
                "notes_ar",
                "notes_en",
            ],
        )

        if normalize_text(feature_value):
            meaningful_features += 1

    if meaningful_features >= 4:
        score += 10

    elif meaningful_features >= 2:
        score += 5

    return clamp_score(score)


# =========================================================
# Market Analysis
# =========================================================

def analyze_market(
    data: Dict[str, Any],
) -> float:
    """
    Calculate market potential.
    """

    project = data.get(
        "project_details"
    ) or {}

    references = data.get(
        "references"
    ) or {}

    score = 50.0

    target_market = first_value(
        project,
        [
            "target_market_en",
            "target_market_ar",
        ],
    )

    main_product = first_value(
        project,
        [
            "main_product_en",
            "main_product_ar",
        ],
    )

    secondary_products = first_value(
        project,
        [
            "secondary_products_en",
            "secondary_products_ar",
        ],
    )

    production_capacity = first_value(
        project,
        [
            "production_capacity",
            "annual_production_capacity",
        ],
    )

    sector = first_value(
        references,
        [
            "sector_name_en",
            "sector_name_ar",
        ],
    )

    project_type = first_value(
        references,
        [
            "project_type_name_en",
            "project_type_name_ar",
        ],
    )

    project_scale = first_value(
        references,
        [
            "project_scale_name_en",
            "project_scale_name_ar",
        ],
    )

    if target_market:
        score += 15

    if main_product:
        score += 10

    if secondary_products:
        score += 10

    if production_capacity is not None:
        score += 10

    if sector:
        score += 5

    if project_type:
        score += 5

    if project_scale:
        score += 5

    return clamp_score(score)


# =========================================================
# Infrastructure Analysis
# =========================================================

def analyze_infrastructure(
    data: Dict[str, Any],
) -> float:
    """
    Calculate infrastructure availability score.

    IMPORTANT:
    Missing infrastructure records mean
    "not documented", not necessarily
    "not available".
    """

    infrastructure = (
        data.get("infrastructure")
        or []
    )

    if not infrastructure:
        return 30.0

    score = 40.0

    available_count = 0

    for item in infrastructure:

        if not isinstance(item, dict):
            continue

        status = first_value(
            item,
            [
                "availability_status_en",
                "availability_status_ar",
                "availability_status",
                "status_en",
                "status_ar",
            ],
        )

        if status_is_available(status):
            available_count += 1

    score += min(
        available_count * 15,
        45,
    )

    if len(infrastructure) >= 5:
        score += 15

    elif len(infrastructure) >= 3:
        score += 10

    elif len(infrastructure) >= 2:
        score += 5

    return clamp_score(score)


# =========================================================
# Employment Analysis
# =========================================================

def analyze_employment(
    data: Dict[str, Any],
) -> float:
    """
    Calculate employment impact score.
    """

    employment = (
        data.get("employment")
        or {}
    )

    total_jobs = to_float(
        employment.get("total_jobs")
    )

    local_jobs = to_float(
        employment.get("local_total_workers")
    )

    score = 50.0

    if total_jobs is not None:

        if total_jobs >= 1000:
            score += 35

        elif total_jobs >= 500:
            score += 30

        elif total_jobs >= 250:
            score += 25

        elif total_jobs >= 100:
            score += 15

        elif total_jobs >= 50:
            score += 10

        elif total_jobs > 0:
            score += 5

    if local_jobs is not None:

        if local_jobs >= 200:
            score += 15

        elif local_jobs >= 100:
            score += 10

        elif local_jobs >= 50:
            score += 5

    if (
        total_jobs is not None
        and local_jobs is not None
        and total_jobs > 0
    ):

        local_ratio = (
            local_jobs / total_jobs
        )

        if local_ratio >= 0.70:
            score += 5

        elif local_ratio >= 0.50:
            score += 3

    return clamp_score(score)


# =========================================================
# Readiness Analysis
# =========================================================

def analyze_readiness(
    data: Dict[str, Any],
) -> float:
    """
    Calculate investment readiness.
    """

    score = 50.0

    approvals = (
        data.get("approvals")
        or []
    )

    attachments = (
        data.get("attachments")
        or []
    )

    references = (
        data.get("references")
        or {}
    )

    project_details = (
        data.get("project_details")
        or {}
    )

    financial = (
        data.get("financial")
        or {}
    )

    status = normalize_text(
        first_value(
            references,
            [
                "status_name_en",
                "status_name_ar",
            ],
        )
    )

    # -----------------------------------------------------
    # Approvals
    # -----------------------------------------------------

    if approvals:

        completed = 0
        pending = 0

        for approval in approvals:

            if not isinstance(approval, dict):
                continue

            approval_status = first_value(
                approval,
                [
                    "approval_status_en",
                    "approval_status_ar",
                    "approval_status",
                ],
            )

            if status_is_completed(
                approval_status
            ):
                completed += 1

            if status_is_pending(
                approval_status
            ):
                pending += 1

        if completed == len(approvals):
            score += 25

        elif completed > 0:
            score += 10

        else:
            score -= 10

        if pending > 0:
            score -= min(
                pending * 3,
                10,
            )

    else:
        score -= 10

    # -----------------------------------------------------
    # Documents
    # -----------------------------------------------------

    available_documents = 0

    for attachment in attachments:

        if not isinstance(attachment, dict):
            continue

        document_status = first_value(
            attachment,
            [
                "document_status_en",
                "document_status_ar",
                "document_status",
                "availability_status_en",
                "availability_status_ar",
            ],
        )

        if status_is_available(
            document_status
        ):
            available_documents += 1

    if available_documents >= 5:
        score += 15

    elif available_documents >= 3:
        score += 10

    elif available_documents >= 1:
        score += 5

    # -----------------------------------------------------
    # Strategic Opportunity
    # -----------------------------------------------------

    if (
        "strategic" in status
        or "استراتيجي" in status
    ):
        score += 10

    # -----------------------------------------------------
    # Basic Data Completeness
    # -----------------------------------------------------

    core_information = 0

    if project_details:
        core_information += 1

    if financial:
        core_information += 1

    if data.get("location"):
        core_information += 1

    if data.get("employment"):
        core_information += 1

    if core_information >= 4:
        score += 5

    elif core_information <= 1:
        score -= 5

    return clamp_score(score)


# =========================================================
# Risk Analysis
# =========================================================

def analyze_risk(
    data: Dict[str, Any],
) -> float:
    """
    Calculate risk score.

    Higher score = lower investment risk.
    """

    score = 70.0

    financial = (
        data.get("financial")
        or {}
    )

    approvals = (
        data.get("approvals")
        or []
    )

    location = (
        data.get("location")
        or {}
    )

    project_details = (
        data.get("project_details")
        or {}
    )

    expected_return = to_float(
        financial.get(
            "expected_return_rate"
        )
    )

    investment_period = to_float(
        financial.get(
            "investment_period_years"
        )
    )

    expandable = is_true(
        location.get("expandable")
    )

    notes = normalize_text(
        first_value(
            financial,
            [
                "notes_en",
                "notes_ar",
                "financial_notes",
            ],
        )
    )

    if expected_return is not None:

        if expected_return >= 12:
            score += 10

        elif expected_return >= 8:
            score += 5

        elif expected_return < 7:
            score -= 15

    if investment_period is not None:

        if investment_period <= 10:
            score += 5

        elif investment_period > 30:
            score -= 10

    pending_approvals = 0

    for approval in approvals:

        if not isinstance(approval, dict):
            continue

        status = first_value(
            approval,
            [
                "approval_status_en",
                "approval_status_ar",
                "approval_status",
            ],
        )

        if status_is_pending(status):
            pending_approvals += 1

    if pending_approvals:
        score -= min(
            pending_approvals * 5,
            15,
        )

    if (
        "requires detailed feasibility" in notes
        or "requires feasibility" in notes
        or "feasibility study" in notes
        or "يتطلب دراسة جدوى" in notes
        or "دراسة جدوى" in notes
    ):
        score -= 5

    if expandable:
        score += 5

    if project_details:
        score += 3

    else:
        score -= 5

    return clamp_score(score)


# =========================================================
# Data Completeness
# =========================================================

def calculate_data_completeness(
    data: Dict[str, Any],
) -> float:
    """
    Calculate how complete the opportunity dataset is.

    This does NOT measure investment attractiveness.

    It measures whether the information required
    for a reliable investment assessment is present.
    """

    opportunity = (
        data.get("opportunity")
        or {}
    )

    references = (
        data.get("references")
        or {}
    )

    financial = (
        data.get("financial")
        or {}
    )

    location = (
        data.get("location")
        or {}
    )

    project = (
        data.get("project_details")
        or {}
    )

    employment = (
        data.get("employment")
        or {}
    )

    infrastructure = (
        data.get("infrastructure")
        or []
    )

    approvals = (
        data.get("approvals")
        or []
    )

    attachments = (
        data.get("attachments")
        or []
    )

    checks = []

    checks.append(
        bool(
            opportunity.get("opportunity_code")
            and opportunity.get("name_ar")
        )
    )

    checks.append(
        bool(
            references.get("sector_name_ar")
            and references.get("project_type_name_ar")
        )
    )

    checks.append(
        bool(
            location.get("area_value")
            and location.get("latitude") is not None
            and location.get("longitude") is not None
        )
    )

    checks.append(
        bool(
            project.get("description_ar")
            and project.get("main_product_ar")
            and project.get("target_market_ar")
        )
    )

    checks.append(
        bool(
            financial.get("estimated_cost")
            and financial.get("expected_return_rate")
            and financial.get("investment_period_years")
        )
    )

    checks.append(
        bool(
            employment.get("total_jobs")
        )
    )

    checks.append(
        bool(
            infrastructure
        )
    )

    checks.append(
        bool(
            approvals
        )
    )

    checks.append(
        bool(
            attachments
        )
    )

    if not checks:
        return 0.0

    score = (
        sum(checks)
        / len(checks)
    ) * 100

    project_scale = first_value(
        references,
        [
            "project_scale_name_ar",
            "project_scale_name_en",
        ],
    )

    if not project_scale:
        score -= 5

    if len(attachments) == 1:
        score -= 3

    if len(infrastructure) == 1:
        score -= 3

    return clamp_score(score)


# =========================================================
# Analysis Confidence
# =========================================================

def calculate_analysis_confidence(
    data: Dict[str, Any],
    data_completeness: float,
) -> float:
    """
    Calculate confidence in the analytical result.

    Confidence measures how reliable the current analysis is
    based on the quality, completeness and verification level
    of the available data.

    It is intentionally separated from investment attractiveness.
    """

    financial = (
        data.get("financial")
        or {}
    )

    location = (
        data.get("location")
        or {}
    )

    project = (
        data.get("project_details")
        or {}
    )

    approvals = (
        data.get("approvals")
        or []
    )

    infrastructure = (
        data.get("infrastructure")
        or []
    )

    attachments = (
        data.get("attachments")
        or []
    )

    references = (
        data.get("references")
        or {}
    )

    # =====================================================
    # 1. Data Completeness
    # =====================================================

    completeness_component = (
        data_completeness * 0.45
    )

    # =====================================================
    # 2. Financial Data Quality
    # =====================================================

    financial_quality = 0.0

    if financial.get("estimated_cost"):
        financial_quality += 25

    if financial.get("expected_return_rate"):
        financial_quality += 25

    if financial.get("annual_investment_return"):
        financial_quality += 20

    if financial.get("investment_period_years"):
        financial_quality += 15

    if first_value(
        financial,
        [
            "financing_model_name_en",
            "financing_model_name_ar",
            "financing_model",
        ],
    ):
        financial_quality += 15

    financial_quality = clamp_score(
        financial_quality
    )

    financial_component = (
        financial_quality * 0.20
    )

    # =====================================================
    # 3. Location & Project Evidence
    # =====================================================

    location_quality = 0.0

    if location.get("area_value"):
        location_quality += 25

    if (
        location.get("latitude") is not None
        and location.get("longitude") is not None
    ):
        location_quality += 25

    if location.get("expandable") is not None:
        location_quality += 10

    if project.get("description_ar") or project.get("description_en"):
        location_quality += 15

    if project.get("main_product_ar") or project.get("main_product_en"):
        location_quality += 10

    if project.get("target_market_ar") or project.get("target_market_en"):
        location_quality += 15

    location_quality = clamp_score(
        location_quality
    )

    location_component = (
        location_quality * 0.15
    )

    # =====================================================
    # 4. Approvals & Readiness Evidence
    # =====================================================

    readiness_quality = 0.0

    if approvals:
        readiness_quality += 50

    completed_approvals = 0
    pending_approvals = 0

    for approval in approvals:

        if not isinstance(approval, dict):
            continue

        status = first_value(
            approval,
            [
                "approval_status_en",
                "approval_status_ar",
                "approval_status",
            ],
        )

        if status_is_completed(status):
            completed_approvals += 1

        if status_is_pending(status):
            pending_approvals += 1

    if completed_approvals > 0:
        readiness_quality += 30

    elif pending_approvals > 0:
        readiness_quality += 10

    if references.get("status_name_en") or references.get("status_name_ar"):
        readiness_quality += 20

    readiness_quality = clamp_score(
        readiness_quality
    )

    readiness_component = (
        readiness_quality * 0.10
    )

    # =====================================================
    # 5. Documentation Quality
    # =====================================================

    documentation_quality = 0.0

    if attachments:
        documentation_quality += 50

    if len(attachments) >= 3:
        documentation_quality += 30

    elif len(attachments) >= 2:
        documentation_quality += 20

    else:
        documentation_quality += 10

    if infrastructure:
        documentation_quality += 20

    documentation_quality = clamp_score(
        documentation_quality
    )

    documentation_component = (
        documentation_quality * 0.10
    )

    # =====================================================
    # Final Confidence
    # =====================================================

    confidence = (
        completeness_component
        + financial_component
        + location_component
        + readiness_component
        + documentation_component
    )

    # =====================================================
    # Controlled Uncertainty Adjustments
    # =====================================================

    estimation_source = normalize_text(
        first_value(
            financial,
            [
                "estimation_source_ar",
                "estimation_source_en",
            ],
        )
    )

    if (
        "initial" in estimation_source
        or "أولي" in estimation_source
        or "تقدير أولي" in estimation_source
    ):
        confidence -= 5

    if len(infrastructure) == 1:
        confidence -= 3

    project_scale = first_value(
        references,
        [
            "project_scale_name_ar",
            "project_scale_name_en",
        ],
    )

    if not project_scale:
        confidence -= 2

    contracts = (
        data.get("contracts")
        or []
    )

    reference_contract = first_value(
        references,
        [
            "contract_type_name_en",
            "contract_type_name_ar",
        ],
    )

    actual_contract_types = []

    for contract in contracts:

        if not isinstance(contract, dict):
            continue

        contract_name = first_value(
            contract,
            [
                "contract_type_name_en",
                "contract_type_name_ar",
            ],
        )

        if contract_name:
            actual_contract_types.append(
                normalize_text(contract_name)
            )

    if (
        reference_contract
        and actual_contract_types
        and normalize_text(reference_contract)
        not in actual_contract_types
    ):
        confidence -= 4

    return clamp_score(
        confidence
    )


# =========================================================
# Gap Analysis
# =========================================================

def identify_gaps(
    data: Dict[str, Any],
) -> List[str]:
    """
    Identify missing or incomplete information
    that can affect investment preparation.
    """

    gaps = []

    references = (
        data.get("references")
        or {}
    )

    financial = (
        data.get("financial")
        or {}
    )

    location = (
        data.get("location")
        or {}
    )

    project = (
        data.get("project_details")
        or {}
    )

    employment = (
        data.get("employment")
        or {}
    )

    infrastructure = (
        data.get("infrastructure")
        or []
    )

    approvals = (
        data.get("approvals")
        or []
    )

    attachments = (
        data.get("attachments")
        or []
    )

    # -----------------------------------------------------
    # Approvals
    # -----------------------------------------------------

    pending_approval_found = False

    for approval in approvals:

        if not isinstance(approval, dict):
            continue

        status = first_value(
            approval,
            [
                "approval_status_en",
                "approval_status_ar",
                "approval_status",
            ],
        )

        if status_is_pending(status):

            pending_approval_found = True
            break

    if pending_approval_found:

        gaps.append(
            "الموافقات المطلوبة لم تُستكمل بالكامل بعد."
        )

    if not approvals:

        gaps.append(
            "سجلات الموافقات غير موثقة."
        )

    # -----------------------------------------------------
    # Feasibility Study
    # -----------------------------------------------------

    notes = normalize_text(
        first_value(
            financial,
            [
                "notes_en",
                "notes_ar",
                "financial_notes",
            ],
        )
    )

    if (
        "feasibility" in notes
        or "دراسة جدوى" in notes
    ):

        gaps.append(
            "هناك حاجة إلى إعداد دراسة جدوى تفصيلية."
        )

    # -----------------------------------------------------
    # Infrastructure
    # -----------------------------------------------------

    if not infrastructure:

        gaps.append(
            "بيانات البنية التحتية غير موثقة."
        )

    elif len(infrastructure) == 1:

        gaps.append(
            "توثيق البنية التحتية محدود ويحتاج إلى التحقق من شبكات الخدمات الأخرى."
        )

    # -----------------------------------------------------
    # Project Scale
    # -----------------------------------------------------

    project_scale = first_value(
        references,
        [
            "project_scale_name_ar",
            "project_scale_name_en",
        ],
    )

    if not project_scale:

        gaps.append(
            "تصنيف حجم المشروع غير موثق."
        )

    # -----------------------------------------------------
    # Financial Estimate
    # -----------------------------------------------------

    estimation_source = normalize_text(
        first_value(
            financial,
            [
                "estimation_source_ar",
                "estimation_source_en",
            ],
        )
    )

    if (
        "initial" in estimation_source
        or "أولي" in estimation_source
        or "تقدير أولي" in estimation_source
    ):

        gaps.append(
            "تكلفة الاستثمار تعتمد حاليًا على تقدير أولي."
        )

    # -----------------------------------------------------
    # Documents
    # -----------------------------------------------------

    if not attachments:

        gaps.append(
            "لا توجد وثائق استثمارية مرفقة."
        )

    elif len(attachments) == 1:

        gaps.append(
            "الوثائق الداعمة تقتصر حاليًا على وثيقة واحدة متاحة."
        )

    # -----------------------------------------------------
    # Market
    # -----------------------------------------------------

    if not project.get("target_market_ar"):

        gaps.append(
            "بيانات السوق المستهدف غير مكتملة."
        )

    # -----------------------------------------------------
    # Employment
    # -----------------------------------------------------

    if not employment.get("total_jobs"):

        gaps.append(
            "تقديرات فرص العمل غير موثقة."
        )

    # -----------------------------------------------------
    # Location
    # -----------------------------------------------------

    if not location.get("area_value"):

        gaps.append(
            "مساحة موقع الاستثمار غير موثقة."
        )

    return unique_list(gaps)


# =========================================================
# Verification Items
# =========================================================

def identify_verification_items(
    data: Dict[str, Any],
) -> List[str]:
    """
    Identify information that exists but requires
    confirmation before final investment decisions.
    """

    verification_items = []

    references = (
        data.get("references")
        or {}
    )

    financial = (
        data.get("financial")
        or {}
    )

    infrastructure = (
        data.get("infrastructure")
        or []
    )

    contracts = (
        data.get("contracts")
        or []
    )

    approvals = (
        data.get("approvals")
        or []
    )

    # -----------------------------------------------------
    # Financial Estimate
    # -----------------------------------------------------

    estimation_source = normalize_text(
        first_value(
            financial,
            [
                "estimation_source_ar",
                "estimation_source_en",
            ],
        )
    )

    if (
        "initial" in estimation_source
        or "أولي" in estimation_source
        or "تقدير أولي" in estimation_source
    ):

        verification_items.append(
            "التحقق من تكلفة الاستثمار من خلال تقييم فني ومالي تفصيلي."
        )

    # -----------------------------------------------------
    # Infrastructure
    # -----------------------------------------------------

    if infrastructure:

        verification_items.append(
            "التحقق من التوافر الفعلي والطاقة الاستيعابية لشبكات البنية التحتية الموثقة."
        )

    # -----------------------------------------------------
    # Approvals
    # -----------------------------------------------------

    for approval in approvals:

        if not isinstance(approval, dict):
            continue

        status = first_value(
            approval,
            [
                "approval_status_en",
                "approval_status_ar",
                "approval_status",
            ],
        )

        if status_is_pending(status):

            verification_items.append(
                "التحقق من الموافقات المتبقية المتعلقة بالتخطيط والتنظيم والتطوير."
            )

            break

    # -----------------------------------------------------
    # Contract Structure
    # -----------------------------------------------------

    reference_contract = first_value(
        references,
        [
            "contract_type_name_en",
            "contract_type_name_ar",
        ],
    )

    actual_contract_types = []

    for contract in contracts:

        if not isinstance(contract, dict):
            continue

        contract_name = first_value(
            contract,
            [
                "contract_type_name_en",
                "contract_type_name_ar",
            ],
        )

        if contract_name:
            actual_contract_types.append(
                str(contract_name)
            )

    actual_contract_types = unique_list(
        actual_contract_types
    )

    if (
        reference_contract
        and actual_contract_types
        and normalize_text(reference_contract)
        not in {
            normalize_text(value)
            for value in actual_contract_types
        }
    ):

        verification_items.append(
            "التحقق من الهيكل التعاقدي والتمويلي، لوجود اختلاف بين النموذج المرجعي وسجلات العقود."
        )

    elif reference_contract:

        verification_items.append(
            f"التحقق من الهيكل التعاقدي المقترح بنموذج {reference_contract} قبل الترويج للفرصة للمستثمرين."
        )

    elif actual_contract_types:

        verification_items.append(
            "التحقق من الهيكل التعاقدي المسجل قبل الترويج للفرصة للمستثمرين."
        )

    return unique_list(
        verification_items
    )


# =========================================================
# Strengths
# =========================================================

def generate_strengths(
    scores: Dict[str, float],
    data: Dict[str, Any],
) -> List[str]:

    strengths = []

    if scores["market"] >= 70:

        strengths.append(
            "إمكانات سوقية قوية"
        )

    if scores["financial"] >= 70:

        strengths.append(
            "جاذبية مالية جيدة"
        )

    if scores["location"] >= 70:

        strengths.append(
            "موقع استراتيجي وقابل للتوسع"
        )

    if scores["infrastructure"] >= 70:

        strengths.append(
            "توافر جيد للبنية التحتية"
        )

    if scores["readiness"] >= 70:

        strengths.append(
            "جاهزية استثمارية جيدة"
        )

    if scores["employment"] >= 70:

        strengths.append(
            "أثر قوي في توفير فرص العمل"
        )

    if scores["risk"] >= 80:

        strengths.append(
            "مستوى مخاطر استثمارية ملائم نسبيًا"
        )

    # -----------------------------------------------------
    # Strategic Status
    # -----------------------------------------------------

    references = (
        data.get("references")
        or {}
    )

    status = normalize_text(
        first_value(
            references,
            [
                "status_name_en",
                "status_name_ar",
            ],
        )
    )

    if (
        "strategic" in status
        or "استراتيجي" in status
    ):

        strengths.append(
            "الفرصة مصنفة كفرصة استراتيجية."
        )

    return unique_list(
        strengths
    )


# =========================================================
# Risks
# =========================================================

def generate_risks(
    scores: Dict[str, float],
    data: Dict[str, Any],
) -> List[str]:

    risks = []

    if scores["market"] < 50:

        risks.append(
            "محدودية المعلومات المتعلقة بالسوق"
        )

    if scores["financial"] < 50:

        risks.append(
            "ضعف المؤشرات المالية"
        )

    if scores["location"] < 50:

        risks.append(
            "الموقع يحتاج إلى تقييم إضافي"
        )

    if scores["infrastructure"] < 50:

        risks.append(
            "بيانات البنية التحتية تحتاج إلى مزيد من التحقق"
        )

    if scores["readiness"] < 50:

        risks.append(
            "الجاهزية الاستثمارية محدودة"
        )

    if scores["employment"] < 50:

        risks.append(
            "بيانات أثر العمالة محدودة"
        )

    if scores["risk"] < 50:

        risks.append(
            "الفرصة تحمل مستوى مخاطر استثمارية مرتفعًا نسبيًا"
        )

    # -----------------------------------------------------
    # Pending Approvals
    # -----------------------------------------------------

    approvals = (
        data.get("approvals")
        or []
    )

    for approval in approvals:

        if not isinstance(approval, dict):
            continue

        status = first_value(
            approval,
            [
                "approval_status_en",
                "approval_status_ar",
                "approval_status",
            ],
        )

        if status_is_pending(status):

            risks.append(
                "الموافقات المطلوبة لا تزال قيد الاستكمال"
            )

            break

    # -----------------------------------------------------
    # Feasibility
    # -----------------------------------------------------

    financial = (
        data.get("financial")
        or {}
    )

    notes = normalize_text(
        first_value(
            financial,
            [
                "notes_en",
                "notes_ar",
                "financial_notes",
            ],
        )
    )

    if (
        "feasibility" in notes
        or "دراسة جدوى" in notes
    ):

        risks.append(
            "هناك حاجة إلى إعداد دراسة جدوى تفصيلية"
        )

    return unique_list(
        risks
    )


# =========================================================
# Recommendations
# =========================================================

def generate_recommendations(
    investment_score: float,
    readiness_score: float,
    scores: Dict[str, float],
    data: Dict[str, Any],
    gaps: List[str],
    verification_items: List[str],
) -> List[str]:

    recommendations = []

    # -----------------------------------------------------
    # Overall Priority
    # -----------------------------------------------------

    if investment_score >= 80:

        recommendations.append(
            "الفرصة مناسبة لإعطائها أولوية في الترويج للمستثمرين."
        )

    elif investment_score >= 70:

        recommendations.append(
            "ينبغي إعطاء الفرصة أولوية في الترويج للمستثمرين."
        )

    elif investment_score >= 55:

        recommendations.append(
            "ينبغي استكمال إعداد الفرصة قبل الترويج لها للمستثمرين."
        )

    else:

        recommendations.append(
            "تحتاج الفرصة إلى استكمالات جوهرية قبل الترويج لها للمستثمرين."
        )

    # -----------------------------------------------------
    # Readiness
    # -----------------------------------------------------

    if readiness_score < 60:

        recommendations.append(
            "استكمال الموافقات المطلوبة والوثائق الاستثمارية."
        )

    # -----------------------------------------------------
    # Market
    # -----------------------------------------------------

    if scores["market"] < 60:

        recommendations.append(
            "تعزيز تحليل السوق وتوثيق السوق المستهدف والطلب المتوقع."
        )

    # -----------------------------------------------------
    # Financial
    # -----------------------------------------------------

    if scores["financial"] < 60:

        recommendations.append(
            "استكمال النموذج المالي والعوائد المتوقعة والافتراضات الاستثمارية."
        )

    # -----------------------------------------------------
    # Location
    # -----------------------------------------------------

    if scores["location"] < 60:

        recommendations.append(
            "استكمال التقييم الفني والمكاني لموقع الاستثمار."
        )

    # -----------------------------------------------------
    # Infrastructure
    # -----------------------------------------------------

    if scores["infrastructure"] < 60:

        recommendations.append(
            "استكمال التحقق من البنية التحتية وتحديد الاستثمارات المطلوبة لتأهيلها عند الحاجة."
        )

    # -----------------------------------------------------
    # Employment
    # -----------------------------------------------------

    if scores["employment"] < 60:

        recommendations.append(
            "استكمال تقديرات فرص العمل، بما في ذلك الأثر المتوقع على العمالة المحلية."
        )

    # -----------------------------------------------------
    # Risk
    # -----------------------------------------------------

    if scores["risk"] < 60:

        recommendations.append(
            "إجراء تقييم تفصيلي للمخاطر قبل اتخاذ القرار الاستثماري النهائي."
        )

    # -----------------------------------------------------
    # Data Gaps
    # -----------------------------------------------------

    if gaps:

        recommendations.append(
            "استكمال فجوات البيانات والوثائق المحددة قبل الترويج النهائي للفرصة للمستثمرين."
        )

    # -----------------------------------------------------
    # Verification
    # -----------------------------------------------------

    if verification_items:

        recommendations.append(
            "التحقق من الافتراضات المالية ومتطلبات البنية التحتية والهيكل التعاقدي قبل اتخاذ القرار الاستثماري النهائي."
        )

    # -----------------------------------------------------
    # Feasibility
    # -----------------------------------------------------

    financial = (
        data.get("financial")
        or {}
    )

    notes = normalize_text(
        first_value(
            financial,
            [
                "notes_en",
                "notes_ar",
                "financial_notes",
            ],
        )
    )

    if (
        "feasibility" in notes
        or "دراسة جدوى" in notes
    ):

        recommendations.append(
            "إعداد دراسة جدوى تفصيلية قبل اتخاذ القرار الاستثماري النهائي."
        )

    return unique_list(
        recommendations
    )


# =========================================================
# Suitable Investors
# =========================================================

def determine_suitable_investors(
    data: Dict[str, Any],
) -> List[str]:
    """
    Determine suitable investor categories
    using the opportunity's actual reference data.

    Raw duplicated values such as "Local" are avoided.
    """

    references = (
        data.get("references")
        or {}
    )

    investors_data = (
        data.get("investors")
        or []
    )

    investor_type = first_value(
        references,
        [
            "investor_type_name_en",
            "investor_type_name_ar",
        ],
    )

    contract_type = first_value(
        references,
        [
            "contract_type_name_en",
            "contract_type_name_ar",
        ],
    )

    sector = first_value(
        references,
        [
            "sector_name_en",
            "sector_name_ar",
        ],
    )

    project_type = first_value(
        references,
        [
            "project_type_name_en",
            "project_type_name_ar",
        ],
    )

    investors = []

    # -----------------------------------------------------
    # Investor Type
    # -----------------------------------------------------

    if investor_type:

        investor_label = (
            f"مستثمرون من فئة {investor_type}"
        )

        investors.append(
            investor_label
        )

    # -----------------------------------------------------
    # Contract Model
    # -----------------------------------------------------

    if contract_type:

        investors.append(
            f"مستثمرون مهتمون بمشاريع {contract_type}"
        )

    # -----------------------------------------------------
    # Sector
    # -----------------------------------------------------

    if sector:

        investors.append(
            f"مستثمرون متخصصون في قطاع {sector}"
        )

    # -----------------------------------------------------
    # Project Type
    # -----------------------------------------------------

    if project_type:

        investors.append(
            f"مستثمرون مهتمون بمشاريع من نوع {project_type}"
        )

    # -----------------------------------------------------
    # Existing Investor Records
    # -----------------------------------------------------

    existing_names = set()

    for investor in investors_data:

        if not isinstance(investor, dict):
            continue

        name = first_value(
            investor,
            [
                "investor_type_name_en",
                "investor_type_name_ar",
                "investor_name_en",
                "investor_name_ar",
                "entity_name_en",
                "entity_name_ar",
            ],
        )

        if not name:
            continue

        normalized_name = normalize_text(
            name
        )

        if (
            investor_type
            and normalized_name
            == normalize_text(investor_type)
        ):
            continue

        if normalized_name in existing_names:
            continue

        existing_names.add(
            normalized_name
        )

        investors.append(
            str(name)
        )

    return unique_list(
        investors
    )


# =========================================================
# Main AI Analysis
# =========================================================

def analyze_opportunity(
    opportunity_id: int,
    data: Dict[str, Any],
) -> AIAnalysisResult:

    # =====================================================
    # Seven Component Scores
    # =====================================================

    market_score = analyze_market(
        data
    )

    financial_score = analyze_financial(
        data
    )

    location_score = analyze_location(
        data
    )

    infrastructure_score = (
        analyze_infrastructure(data)
    )

    readiness_score = analyze_readiness(
        data
    )

    employment_score = analyze_employment(
        data
    )

    risk_score = analyze_risk(
        data
    )

    # =====================================================
    # Score Dictionary
    # =====================================================

    scores = {
        "market": market_score,
        "financial": financial_score,
        "location": location_score,
        "infrastructure": infrastructure_score,
        "readiness": readiness_score,
        "employment": employment_score,
        "risk": risk_score,
    }

    # =====================================================
    # Overall Investment Score
    # =====================================================

    result = calculate_investment_score(
        market_score=market_score,
        financial_score=financial_score,
        location_score=location_score,
        infrastructure_score=infrastructure_score,
        readiness_score=readiness_score,
        employment_score=employment_score,
        risk_score=risk_score,
    )

    investment_score = result[
        "investment_score"
    ]

    investment_grade = get_investment_grade(
        investment_score
    )

    # =====================================================
    # Data Quality Analysis
    # =====================================================

    data_completeness = (
        calculate_data_completeness(
            data
        )
    )

    analysis_confidence = (
        calculate_analysis_confidence(
            data,
            data_completeness,
        )
    )

    # =====================================================
    # Gap Analysis
    # =====================================================

    gaps = identify_gaps(
        data
    )

    verification_items = (
        identify_verification_items(
            data
        )
    )

    # =====================================================
    # AI Interpretation
    # =====================================================

    strengths = generate_strengths(
        scores,
        data,
    )

    risks = generate_risks(
        scores,
        data,
    )

    recommendations = (
        generate_recommendations(
            investment_score=investment_score,
            readiness_score=readiness_score,
            scores=scores,
            data=data,
            gaps=gaps,
            verification_items=verification_items,
        )
    )

    suitable_investors = (
        determine_suitable_investors(
            data
        )
    )

    # =====================================================
    # Summary
    # =====================================================

    summary = (
        f"حصلت الفرصة الاستثمارية على درجة "
        f"جاذبية استثمارية قدرها "
        f"{investment_score}/100، وتم تصنيفها "
        f"ضمن فئة «{investment_grade}». "
        f"تبلغ نسبة اكتمال البيانات "
        f"{data_completeness}/100، بينما تبلغ "
        f"درجة الثقة في التحليل "
        f"{analysis_confidence}/100."
    )

    # =====================================================
    # Final AI Analysis Result
    # =====================================================

    return AIAnalysisResult(
        opportunity_id=opportunity_id,

        investment_score=investment_score,

        investment_grade=investment_grade,

        summary=summary,

        strengths=strengths,

        risks=risks,

        recommendations=recommendations,

        score_breakdown=AIScoreBreakdown(
            market_score=market_score,

            financial_score=financial_score,

            location_score=location_score,

            infrastructure_score=(
                infrastructure_score
            ),

            readiness_score=readiness_score,

            employment_score=employment_score,

            risk_score=risk_score,
        ),

        suitable_investors=suitable_investors,

        estimated_readiness=readiness_score,

        data_completeness=data_completeness,

        analysis_confidence=analysis_confidence,

        gaps=gaps,

        verification_items=verification_items,
    )