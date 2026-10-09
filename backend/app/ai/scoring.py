from typing import Dict


def clamp_score(value: float) -> float:
    """
    Keep a score between 0 and 100.
    """
    return round(
        max(0.0, min(100.0, float(value))),
        2,
    )


def calculate_investment_score(
    market_score: float,
    financial_score: float,
    location_score: float,
    infrastructure_score: float,
    readiness_score: float,
    employment_score: float,
    risk_score: float,
) -> Dict[str, float]:
    """
    Calculate the overall investment attractiveness score.

    All component scores are normalized to the range 0-100
    before calculating the weighted investment score.
    """

    # Normalize all component scores
    market_score = clamp_score(market_score)
    financial_score = clamp_score(financial_score)
    location_score = clamp_score(location_score)
    infrastructure_score = clamp_score(infrastructure_score)
    readiness_score = clamp_score(readiness_score)
    employment_score = clamp_score(employment_score)
    risk_score = clamp_score(risk_score)

    # Current investment scoring weights
    weights = {
        "market": 0.20,
        "financial": 0.20,
        "location": 0.15,
        "infrastructure": 0.15,
        "readiness": 0.15,
        "employment": 0.10,
        "risk": 0.05,
    }

    investment_score = (
        market_score * weights["market"]
        + financial_score * weights["financial"]
        + location_score * weights["location"]
        + infrastructure_score * weights["infrastructure"]
        + readiness_score * weights["readiness"]
        + employment_score * weights["employment"]
        + risk_score * weights["risk"]
    )

    investment_score = clamp_score(investment_score)

    return {
        "investment_score": investment_score,
        "market_score": market_score,
        "financial_score": financial_score,
        "location_score": location_score,
        "infrastructure_score": infrastructure_score,
        "readiness_score": readiness_score,
        "employment_score": employment_score,
        "risk_score": risk_score,
    }


def get_investment_grade(score: float) -> str:
    """
    Convert the investment score into a human-readable grade.
    """

    score = clamp_score(score)

    if score >= 85:
        return "Excellent"

    if score >= 70:
        return "Very Good"

    if score >= 55:
        return "Good"

    if score >= 40:
        return "Moderate"

    return "Low"