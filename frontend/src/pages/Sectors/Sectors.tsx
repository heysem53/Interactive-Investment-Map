import { useEffect, useMemo, useState } from "react";

import PageMeta from "../../components/common/PageMeta";

import {
  getOpportunities,
} from "../../services/opportunityService";

import type { Opportunity } from "../../types/opportunity";

export default function Sectors() {
  const [opportunities, setOpportunities] =
    useState<Opportunity[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /* =========================================================
     تحميل الفرص من FastAPI
  ========================================================= */

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await getOpportunities();

        setOpportunities(data);
      } catch (err) {
        console.error(
          "Failed to load sector data:",
          err
        );

        setError(
          "تعذر تحميل بيانات القطاعات من الخادم."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /* =========================================================
     تحليل القطاعات
  ========================================================= */

  const sectorStats = useMemo(() => {
    const stats: Record<
      string,
      {
        opportunities: number;
        investment: number;
      }
    > = {};

    opportunities.forEach(
      (opportunity) => {
        if (!stats[opportunity.sector]) {
          stats[opportunity.sector] = {
            opportunities: 0,
            investment: 0,
          };
        }

        stats[
          opportunity.sector
        ].opportunities += 1;

        stats[
          opportunity.sector
        ].investment += opportunity.value;
      }
    );

    return Object.entries(stats)
      .map(
        ([name, data]) => ({
          name,
          opportunities:
            data.opportunities,
          investment:
            data.investment,
        })
      )
      .sort(
        (a, b) =>
          b.opportunities -
          a.opportunities
      );
  }, [opportunities]);

  /* =========================================================
     المؤشرات
  ========================================================= */

  const totalSectors =
    sectorStats.length;

  const totalOpportunities =
    opportunities.length;

  const totalInvestment =
    opportunities.reduce(
      (sum, opportunity) =>
        sum + opportunity.value,
      0
    );

  /* =========================================================
     حالة التحميل
  ========================================================= */

  if (loading) {
    return (
      <>
        <PageMeta
          title="القطاعات | خارطة الاستثمار الذكية"
          description="تحليل وتوزيع الفرص الاستثمارية حسب القطاعات"
        />

        <div
          dir="rtl"
          className="flex min-h-[400px] items-center justify-center"
        >
          <div className="text-sm text-gray-500 dark:text-gray-400">
            جاري تحميل بيانات القطاعات...
          </div>
        </div>
      </>
    );
  }

  /* =========================================================
     حالة الخطأ
  ========================================================= */

  if (error) {
    return (
      <>
        <PageMeta
          title="القطاعات | خارطة الاستثمار الذكية"
          description="تحليل وتوزيع الفرص الاستثمارية حسب القطاعات"
        />

        <div
          dir="rtl"
          className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700"
        >
          {error}
        </div>
      </>
    );
  }

  /* =========================================================
     الصفحة
  ========================================================= */

  return (
    <>
      <PageMeta
        title="القطاعات | خارطة الاستثمار الذكية"
        description="تحليل وتوزيع الفرص الاستثمارية حسب القطاعات"
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
            القطاعات الاستثمارية
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            نظرة شاملة على توزيع الفرص الاستثمارية والقيمة التقديرية حسب القطاعات
          </p>
        </div>

        {/* =================================================
            المؤشرات
        ================================================= */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

          <MetricCard
            title="عدد القطاعات"
            value={totalSectors.toString()}
          />

          <MetricCard
            title="إجمالي الفرص"
            value={totalOpportunities.toString()}
          />

          <MetricCard
            title="إجمالي القيمة الاستثمارية"
            value={`${totalInvestment.toLocaleString(
              "en-US",
              {
                maximumFractionDigits: 2,
              }
            )} مليون دولار`}
          />

        </div>

        {/* =================================================
            قائمة القطاعات
        ================================================= */}

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">

          <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">

            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              توزيع الفرص حسب القطاع
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              عدد الفرص والقيمة الاستثمارية التقديرية لكل قطاع
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[800px] text-right">

              <thead className="bg-gray-50 dark:bg-white/[0.02]">

                <tr>

                  <th className="px-6 py-4 text-sm font-medium text-gray-500">
                    القطاع
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-gray-500">
                    عدد الفرص
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-gray-500">
                    نسبة الفرص
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-gray-500">
                    القيمة الاستثمارية
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-gray-500">
                    التوزيع
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">

                {sectorStats.map(
                  (sector) => {

                    const percentage =
                      totalOpportunities ===
                      0
                        ? 0
                        : (
                            (sector.opportunities /
                              totalOpportunities) *
                            100
                          );

                    return (
                      <tr
                        key={
                          sector.name
                        }
                        className="transition hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                      >

                        {/* القطاع */}

                        <td className="px-6 py-5">

                          <span className="font-semibold text-gray-800 dark:text-white">
                            {
                              sector.name
                            }
                          </span>

                        </td>

                        {/* عدد الفرص */}

                        <td className="px-6 py-5 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {
                            sector.opportunities
                          }
                        </td>

                        {/* النسبة */}

                        <td className="px-6 py-5 text-sm text-gray-500">
                          {percentage.toFixed(
                            1
                          )}
                          %
                        </td>

                        {/* القيمة */}

                        <td className="px-6 py-5 text-sm font-semibold text-gray-800 dark:text-white">

                          {sector.investment.toLocaleString(
                            "en-US",
                            {
                              maximumFractionDigits: 2,
                            }
                          )}

                          {" مليون دولار"}

                        </td>

                        {/* شريط التوزيع */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">

                              <div
                                className="h-full rounded-full bg-brand-500 transition-all duration-500"
                                style={{
                                  width: `${percentage}%`,
                                }}
                              />

                            </div>

                            <span className="w-12 text-left text-xs text-gray-500">
                              {percentage.toFixed(
                                0
                              )}
                              %
                            </span>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )}

                {sectorStats.length ===
                  0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-sm text-gray-500"
                    >
                      لا توجد بيانات قطاعات متاحة حالياً.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

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
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {title}
      </p>

      <h2 className="mt-3 text-2xl font-bold text-gray-800 dark:text-white">
        {value}
      </h2>

    </div>
  );
}