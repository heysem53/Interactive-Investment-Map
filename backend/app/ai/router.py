from fastapi import APIRouter, HTTPException

from .schemas import AIAnalysisResult
from .analyzer import analyze_opportunity

from ..services.opportunity_service import (
    get_opportunity_by_code,
)


router = APIRouter(
    prefix="/api/ai",
    tags=["AI Analysis"],
)


@router.post(
    "/opportunities/{opportunity_code}/analyze",
    response_model=AIAnalysisResult,
)
def analyze_investment_opportunity(
    opportunity_code: str,
):
    """
    Analyze an investment opportunity using
    real database data.

    The opportunity is identified by its code,
    for example: DZ-001.
    """

    try:
        # =====================================================
        # جلب بيانات الفرصة حسب الرمز
        # =====================================================

        opportunity_data = get_opportunity_by_code(
            opportunity_code
        )

        if not opportunity_data:
            raise HTTPException(
                status_code=404,
                detail="Opportunity not found",
            )

        # =====================================================
        # استخراج رقم الفرصة
        # =====================================================

        opportunity = opportunity_data.get(
            "opportunity",
            opportunity_data,
        )

        opportunity_id = opportunity.get(
            "opportunity_id"
        )

        if opportunity_id is None:
            raise HTTPException(
                status_code=404,
                detail="Opportunity ID not found",
            )

        # =====================================================
        # تشغيل التحليل
        # =====================================================

        return analyze_opportunity(
            opportunity_id=int(opportunity_id),
            data=opportunity_data,
        )

    except HTTPException:
        raise

    except Exception as exc:
        print(
            "ERROR during AI analysis:",
            str(exc),
        )

        raise HTTPException(
            status_code=500,
            detail=f"AI analysis failed: {str(exc)}",
        )