import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import PageMeta from "../../components/common/PageMeta";

import {
  getOpportunityByCodeApi,
  analyzeOpportunityApi,
  type OpportunityApiResponse,
  type AIAnalysisResult,
} from "../../services/opportunityApi";

export default function OpportunityAnalysis() {
  const { code } = useParams();

  const [opportunity, setOpportunity] =
    useState<OpportunityApiResponse | null>(null);

  const [analysis, setAnalysis] =
    useState<AIAnalysisResult | null>(null);

  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* =========================================================
     تحميل بيانات الفرصة
  ========================================================= */

  useEffect(() => {
    if (!code) {
      setLoading(false);
      setError("رمز الفرصة غير موجود.");
      return;
    }

    getOpportunityByCodeApi(code)
      .then((result) => {
        setOpportunity(result);
        setError(null);
      })
      .catch((err) => {
        console.error(
          "Failed to load opportunity:",
          err
        );

        setOpportunity(null);

        setError(
          err instanceof Error
            ? err.message
            : "تعذر تحميل بيانات الفرصة."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [code]);

  /* =========================================================
     تشغيل التحليل الذكي
  ========================================================= */

  async function handleAnalyze() {
    if (!opportunity) {
      return;
    }

    setAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeOpportunityApi(
        opportunity.opportunity.opportunity_code
      );

      setAnalysis(result);
    } catch (err) {
      console.error(
        "AI analysis failed:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "حدث خطأ أثناء التحليل الذكي"
      );
    } finally {
      setAnalyzing(false);
    }
  }

  /* =========================================================
     Loading
  ========================================================= */

  if (loading) {
    return (
      <div
        dir="rtl"
        className="flex min-h-[400px] items-center justify-center"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          جاري تحميل بيانات الفرصة للتحليل الذكي...
        </p>
      </div>
    );
  }

  /* =========================================================
     Opportunity not found
  ========================================================= */

  if (!opportunity) {
    return (
      <div
        dir="rtl"
        className="space-y-6"
      >
        <PageMeta
          title="الفرصة غير موجودة | التحليل الذكي"
          description="تعذر تحميل بيانات الفرصة الاستثمارية"
        />

        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-xl font-bold text-red-500 dark:bg-red-500/10">
            !
          </div>

          <h1 className="mt-5 text-xl font-bold text-gray-800 dark:text-white">
            تعذر تحميل الفرصة
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {error ??
              "لم يتم العثور على بيانات الفرصة المطلوبة للتحليل."}
          </p>

          <Link
            to="/opportunities"
            className="mt-6 inline-flex rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-600"
          >
            العودة إلى الفرص الاستثمارية
          </Link>
        </div>
      </div>
    );
  }

  /* =========================================================
     Data
  ========================================================= */

  const opportunityInfo =
    opportunity.opportunity;

  const references =
    opportunity.references;

  const opportunityCode =
    opportunityInfo.opportunity_code ?? code;

  /* =========================================================
     Page
  ========================================================= */

  return (
    <>
      <PageMeta
        title={`التحليل الذكي - ${
          opportunityInfo.name_ar ?? "الفرصة"
        }`}
        description="التحليل الذكي للفرصة الاستثمارية باستخدام الذكاء الاصطناعي"
      />

      <div
        dir="rtl"
        className="space-y-6"
      >
        {/* =====================================================
            رأس الصفحة
        ===================================================== */}

        <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6 dark:border-brand-500/20 dark:bg-brand-500/5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Link
                  to="/opportunities"
                  className="transition hover:text-brand-500"
                >
                  الفرص الاستثمارية
                </Link>

                <span>/</span>

                <Link
                  to={`/opportunities/${opportunityCode}`}
                  className="transition hover:text-brand-500"
                >
                  {opportunityCode}
                </Link>

                <span>/</span>

                <span>
                  التحليل الذكي
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-sm font-bold text-white">
                  AI
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    التحليل الذكي للفرصة
                  </h1>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {opportunityInfo.name_ar}
                  </p>
                </div>
              </div>
            </div>

            <Link
              to={`/opportunities/${opportunityCode}`}
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:bg-white/[0.05]"
            >
              العودة إلى تفاصيل الفرصة
            </Link>
          </div>
        </div>

        {/* =====================================================
            بيانات الفرصة
        ===================================================== */}

        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              الفرصة محل التحليل
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              البيانات التي سيتم استخدامها في التحليل الذكي
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <AnalysisInfo
              label="رمز الفرصة"
              value={
                opportunityInfo.opportunity_code ??
                "غير محدد"
              }
            />

            <AnalysisInfo
              label="اسم الفرصة"
              value={
                opportunityInfo.name_ar ??
                "غير محدد"
              }
            />

            <AnalysisInfo
              label="القطاع"
              value={
                references.sector_name_ar ??
                "غير محدد"
              }
            />

            <AnalysisInfo
              label="القطاع الفرعي"
              value={
                references.sub_sector_name_ar ??
                "غير محدد"
              }
            />
          </div>
        </div>

        {/* =====================================================
            منطقة التحليل
        ===================================================== */}

        <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-50 text-2xl font-bold text-brand-500 dark:bg-brand-500/10">
              AI
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-800 dark:text-white">
              التحليل الذكي للفرصة الاستثمارية
            </h2>

            <p className="mt-3 leading-7 text-gray-500 dark:text-gray-400">
              يقوم محرك التحليل بتقييم الفرصة
              الاستثمارية اعتمادًا على بياناتها
              المالية والتشغيلية ومؤشرات الجاهزية
              والمخاطر.
            </p>

            {/* =================================================
                زر التحليل
            ================================================= */}

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={analyzing}
              className="mt-8 inline-flex min-w-[220px] items-center justify-center rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {analyzing
                ? "جاري تحليل الفرصة..."
                : analysis
                ? "إعادة التحليل"
                : "ابدأ التحليل الذكي"}
            </button>

            {/* =================================================
                Error
            ================================================= */}

            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-right dark:border-red-500/20 dark:bg-red-500/10">
                <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                  تعذر تنفيذ التحليل
                </p>

                <p className="mt-1 text-xs text-red-500 dark:text-red-300">
                  {error}
                </p>
              </div>
            )}

            {/* =================================================
                المؤشرات الأساسية
            ================================================= */}

            {analysis && (
              <div className="mt-10 text-right">
                <h3 className="mb-5 text-lg font-bold text-gray-800 dark:text-white">
                  نتيجة التحليل
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <ResultCard
                    title="درجة الاستثمار"
                    value={formatScore(
                      analysis.investment_score
                    )}
                    suffix="/ 100"
                  />

                  <ResultCard
                    title="التصنيف الاستثماري"
                    value={formatInvestmentGrade(
                      analysis.investment_grade
                    )}
                  />

                  <ResultCard
                    title="الجاهزية الاستثمارية"
                    value={
                      analysis.estimated_readiness !==
                        undefined &&
                      analysis.estimated_readiness !== null
                        ? `${formatScore(
                            analysis.estimated_readiness
                          )}%`
                        : "غير محدد"
                    }
                  />

                  <ResultCard
                    title="رقم الفرصة"
                    value={`${analysis.opportunity_id}`}
                  />
                </div>

                {/* =================================================
                    تفصيل الدرجات
                ================================================= */}

                {analysis.score_breakdown && (
                  <div className="mt-6 rounded-xl border border-gray-200 p-6 dark:border-gray-800">
                    <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white">
                      تفصيل درجة الاستثمار
                    </h3>
                
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {Object.entries(
                        analysis.score_breakdown
                      ).map(([key, value]) => (
                        <div
                          key={key}
                          className="rounded-lg bg-gray-50 p-4 dark:bg-white/[0.03]"
                        >
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatLabel(key)}
                          </p>
                
                          <p className="mt-2 text-lg font-bold text-gray-800 dark:text-white">
                            {formatScoreValue(value)}
                            <span className="mr-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                              / 100
                            </span>
                          </p>
                
                          {key === "risk_score" && (
                            <p className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                              كلما ارتفعت الدرجة كان مستوى المخاطر أكثر ملاءمة للاستثمار.
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* =================================================
                    نقاط القوة
                ================================================= */}

                {analysis.strengths &&
                  analysis.strengths.length > 0 && (
                    <AnalysisList
                      title="نقاط القوة"
                      items={
                        analysis.strengths
                      }
                    />
                  )}

                {/* =================================================
                    المخاطر
                ================================================= */}

                {analysis.risks &&
                  analysis.risks.length > 0 && (
                    <AnalysisList
                      title="المخاطر"
                      items={analysis.risks}
                    />
                  )}

                {/* =================================================
                    التوصيات
                ================================================= */}

                {analysis.recommendations &&
                  analysis.recommendations.length > 0 && (
                    <AnalysisList
                      title="التوصيات الاستثمارية"
                      items={
                        analysis.recommendations
                      }
                    />
                  )}
              </div>
            )}

            {/* =================================================
                المحرك
            ================================================= */}

            {!analysis && !analyzing && (
              <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-5 dark:border-gray-700 dark:bg-white/[0.02]">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  محرك الذكاء الاصطناعي
                </p>

                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  اضغط على «ابدأ التحليل الذكي»
                  لتشغيل محرك تحليل الفرصة.
                </p>
              </div>
            )}

            {analyzing && (
              <div className="mt-8 rounded-xl border border-brand-200 bg-brand-50 p-5 dark:border-brand-500/20 dark:bg-brand-500/5">
                <p className="text-sm font-medium text-brand-600 dark:text-brand-400">
                  جاري تحليل بيانات الفرصة...
                </p>

                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  يتم حساب مؤشرات الاستثمار والجاهزية
                  والمخاطر.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   Components
========================================================= */

function AnalysisInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-4 dark:bg-white/[0.03]">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function ResultCard({
  title,
  value,
  suffix,
}: {
  title: string;
  value: string;
  suffix?: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {title}
      </p>

      <div className="mt-3">
        <span className="text-2xl font-bold text-gray-800 dark:text-white">
          {value}
        </span>

        {suffix && (
          <span className="mr-1 text-xs text-gray-500 dark:text-gray-400">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function AnalysisList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="mt-6 rounded-xl border border-gray-200 p-6 dark:border-gray-800">
      <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white">
        {title}
      </h3>

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={`${title}-${index}`}
            className="flex gap-3 text-sm leading-6 text-gray-600 dark:text-gray-300"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />

            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* =========================================================
   Helpers
========================================================= */

/**
 * تنسيق الدرجات الرقمية بشكل ثابت.
 * مثال: 80.45 بدل 80.450000
 */
function formatScore(
  value: number | string
): string {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return String(value);
  }

  return numericValue.toFixed(2);
}

/**
 * تنسيق القيم الموجودة داخل تفصيل الدرجات.
 */
function formatScoreValue(
  value: number | string | null
): string {
  if (value === null || value === undefined) {
    return "غير محدد";
  }

  if (
    typeof value === "number" ||
    !Number.isNaN(Number(value))
  ) {
    return formatScore(Number(value));
  }

  return String(value);
}

/**
 * ترجمة التصنيف الاستثماري القادم من الـ API.
 */
function formatInvestmentGrade(
  grade?: string | null
): string {
  if (!grade) {
    return "غير محدد";
  }

  const normalizedGrade =
    grade.trim().toLowerCase();

  const grades: Record<string, string> = {
    excellent: "ممتاز",
    "very good": "جيد جدًا",
    good: "جيد",
    moderate: "متوسط",
    weak: "ضعيف",
    poor: "ضعيف جدًا",
  };

  return (
    grades[normalizedGrade] ??
    grade
  );
}

function formatLabel(key: string) {
  const labels: Record<string, string> = {
    market_score: "السوق",
    financial_score: "التقييم المالي",
    location_score: "الموقع",
    infrastructure_score: "البنية التحتية",
    readiness_score: "جاهزية الاستثمار",
    employment_score: "العمالة",
    risk_score: "المخاطر",

    market: "السوق",
    financial: "التقييم المالي",
    location: "الموقع",
    infrastructure: "البنية التحتية",
    readiness: "جاهزية الاستثمار",
    employment: "العمالة",
    risk: "المخاطر",
    project: "المشروع",
  };

  return labels[key] ?? key;
}