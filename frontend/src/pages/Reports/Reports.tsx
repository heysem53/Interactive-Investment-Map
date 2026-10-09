import { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { getOpportunities } from "../../services/opportunityService";
import type { Opportunity } from "../../types/opportunity";

export default function Reports() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const data = await getOpportunities();

        setOpportunities(data);
      } catch (error) {
        console.error(
          "Failed to load opportunities:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /* =========================================================
     المؤشرات
  ========================================================= */

  const totalOpportunities =
    opportunities.length;

  const activeOpportunities =
    opportunities.filter(
      (item) => item.status === "نشطة"
    ).length;

  const readyOpportunities =
    opportunities.filter(
      (item) => item.status === "جاهزة"
    ).length;

  const totalInvestment =
    opportunities.reduce(
      (sum, item) => sum + item.value,
      0
    );

  /* =========================================================
     العرض
  ========================================================= */

  return (
    <>
      <PageMeta
        title="التقارير والمؤشرات | خارطة الاستثمار الذكية"
        description="التقارير والمؤشرات الاستثمارية والتحليلات"
      />

      <div
        dir="rtl"
        className="space-y-6"
      >

        {/* =================================================
            عنوان الصفحة
        ================================================= */}

        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            التقارير والمؤشرات
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            عرض التقارير والمؤشرات الرئيسية لدعم القرار الاستثماري
          </p>
        </div>

        {/* =================================================
            المؤشرات الرئيسية
        ================================================= */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <MetricCard
            title="إجمالي الفرص"
            value={
              loading
                ? "..."
                : totalOpportunities.toString()
            }
          />

          <MetricCard
            title="الفرص النشطة"
            value={
              loading
                ? "..."
                : activeOpportunities.toString()
            }
          />

          <MetricCard
            title="الفرص الجاهزة"
            value={
              loading
                ? "..."
                : readyOpportunities.toString()
            }
          />

          <MetricCard
            title="القيمة الاستثمارية"
            value={
              loading
                ? "..."
                : `${totalInvestment.toLocaleString(
                    "en-US",
                    {
                      maximumFractionDigits: 2,
                    }
                  )} مليون`
            }
            suffix="دولار"
          />

        </div>

        {/* =================================================
            التقارير
        ================================================= */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          <ReportCard
            title="تقرير الفرص الاستثمارية"
            description="تحليل شامل للفرص حسب القطاع والموقع والحالة"
          />

          <ReportCard
            title="التقرير المالي"
            description="تحليل القيم الاستثمارية والتكاليف والتمويل"
          />

          <ReportCard
            title="التقرير القطاعي"
            description="توزيع وتحليل الفرص الاستثمارية حسب القطاعات"
          />

          <ReportCard
            title="التقرير الجغرافي"
            description="تحليل توزيع الفرص الاستثمارية حسب المناطق والمواقع"
          />

        </div>

        {/* =================================================
            التقارير المتقدمة
        ================================================= */}

        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">

          <div className="mb-5">

            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              التقارير المتقدمة
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              تقارير وتحليلات متقدمة لدعم المستثمر وصانع القرار
            </p>

          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            <AdvancedReport
              title="جاهزية الفرص"
              description="تحليل مستوى جاهزية الفرص للاستثمار"
            />

            <AdvancedReport
              title="تحليل القطاعات"
              description="مقارنة أداء وتوزيع الفرص بين القطاعات"
            />

            <AdvancedReport
              title="تحليل الاستثمار"
              description="تحليل شامل للقيمة الاستثمارية والفرص"
            />

          </div>

        </div>

      </div>
    </>
  );
}

/* =========================================================
   Metric Card
========================================================= */

function MetricCard({
  title,
  value,
  suffix,
}: {
  title: string;
  value: string;
  suffix?: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {title}
      </p>

      <div className="mt-3 flex items-end gap-2">

        <span className="text-3xl font-bold text-gray-800 dark:text-white">
          {value}
        </span>

        {suffix && (
          <span className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            {suffix}
          </span>
        )}

      </div>

    </div>
  );
}

/* =========================================================
   Report Card
========================================================= */

function ReportCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-brand-300 hover:shadow-theme-sm dark:border-gray-800 dark:bg-white/[0.03]">

      <div className="flex items-start justify-between gap-4">

        <div>

          <h3 className="text-base font-semibold text-gray-800 dark:text-white">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
            {description}
          </p>

        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10 dark:text-brand-400">
          ↗
        </div>

      </div>

      <button
        type="button"
        className="mt-5 rounded-lg bg-brand-50 px-4 py-2 text-sm font-medium text-brand-600 transition hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:hover:bg-brand-500/20"
      >
        عرض التقرير
      </button>

    </div>
  );
}

/* =========================================================
   Advanced Report
========================================================= */

function AdvancedReport({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">

      <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
        {description}
      </p>

      <button
        type="button"
        className="mt-4 text-xs font-medium text-brand-500 hover:text-brand-600"
      >
        فتح التحليل ←
      </button>

    </div>
  );
}