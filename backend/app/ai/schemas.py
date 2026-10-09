from pydantic import BaseModel, Field
from typing import List, Optional


# =========================================================
# AI Analysis Request
# =========================================================

class AIAnalysisRequest(BaseModel):
    opportunity_id: int


# =========================================================
# AI Score Breakdown
# =========================================================

class AIScoreBreakdown(BaseModel):
    market_score: float = Field(
        ge=0,
        le=100,
    )

    financial_score: float = Field(
        ge=0,
        le=100,
    )

    location_score: float = Field(
        ge=0,
        le=100,
    )

    infrastructure_score: float = Field(
        ge=0,
        le=100,
    )

    readiness_score: float = Field(
        ge=0,
        le=100,
    )

    employment_score: float = Field(
        ge=0,
        le=100,
    )

    risk_score: float = Field(
        ge=0,
        le=100,
    )


# =========================================================
# AI Analysis Result
# =========================================================

class AIAnalysisResult(BaseModel):
    # -----------------------------------------------------
    # Identification
    # -----------------------------------------------------

    opportunity_id: int

    # -----------------------------------------------------
    # Overall Investment Assessment
    # -----------------------------------------------------

    investment_score: float = Field(
        ge=0,
        le=100,
    )

    investment_grade: str

    summary: str

    # -----------------------------------------------------
    # AI Interpretation
    # -----------------------------------------------------

    strengths: List[str]

    risks: List[str]

    recommendations: List[str]

    # -----------------------------------------------------
    # Score Breakdown
    # -----------------------------------------------------

    score_breakdown: AIScoreBreakdown

    # -----------------------------------------------------
    # Investor Matching
    # -----------------------------------------------------

    suitable_investors: List[str]

    # -----------------------------------------------------
    # Investment Readiness
    # -----------------------------------------------------

    estimated_readiness: Optional[float] = Field(
        default=None,
        ge=0,
        le=100,
    )

    # -----------------------------------------------------
    # Data Quality
    # -----------------------------------------------------

    data_completeness: float = Field(
        ge=0,
        le=100,
    )

    analysis_confidence: float = Field(
        ge=0,
        le=100,
    )

    # -----------------------------------------------------
    # Data / Investment Gaps
    # -----------------------------------------------------

    gaps: List[str]

    # -----------------------------------------------------
    # Items Requiring Verification
    # -----------------------------------------------------

    verification_items: List[str]