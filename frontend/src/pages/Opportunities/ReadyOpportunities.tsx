import { useEffect, useState } from "react";
import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import type { Opportunity } from "../../types/opportunity";
import { getOpportunities } from "../../services/opportunityService";

export default function ReadyOpportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getOpportunities();

        setOpportunities(
          data.filter(
            (opportunity) =>
              opportunity.status === "جاهزة"
          )
        );
      } catch (err) {
        console.error(
          "Failed to load ready opportunities:",
          err
        );

        setError(
          "تعذر تحميل الفرص الجاهزة من الخادم."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <PageMeta
        title="الفرص الجاهزة | خارطة الاستثمار الذكية"
        description="الفرص الاستثمارية الجاهزة للطرح والاستثمار"
      />

      <div
        dir="rtl"
        className="space-y-6"
      >
        {/* العنوان */}

        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            الفرص الجاهزة
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            الفرص الاستثمارية الجاهزة للطرح والاستثمار
          </p>
        </div>

        {/* المؤشر */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              عدد الفرص الجاهزة
            </p>

            <div className="mt-3 text-3xl font-bold text-gray-800 dark:text-white">
              {opportunities.length}
            </div>
          </div>
        </div>

        {/* القائمة */}

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              الفرص الاستثمارية الجاهزة
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              عرض جميع الفرص التي أصبحت جاهزة للطرح
            </p>
          </div>

          {/* Loading */}

          {loading && (
            <div className="px-6 py-12 text-center text-sm text-gray-500">
              جاري تحميل الفرص الجاهزة...
            </div>
          )}

          {/* Error */}

          {!loading && error && (
            <div className="px-6 py-12 text-center text-sm text-red-500">
              {error}
            </div>
          )}

          {/* Table */}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-right">
                <thead className="bg-gray-50 dark:bg-white/[0.02]">
                  <tr>
                    <th className="px-6 py-4 text-sm font-medium text-gray-500">
                      الرمز
                    </th>

                    <th className="px-6 py-4 text-sm font-medium text-gray-500">
                      الفرصة
                    </th>

                    <th className="px-6 py-4 text-sm font-medium text-gray-500">
                      القطاع
                    </th>

                    <th className="px-6 py-4 text-sm font-medium text-gray-500">
                      الموقع
                    </th>

                    <th className="px-6 py-4 text-sm font-medium text-gray-500">
                      القيمة
                    </th>

                    <th className="px-6 py-4 text-sm font-medium text-gray-500">
                      الإجراء
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {opportunities.map(
                    (opportunity) => (
                      <tr
                        key={opportunity.code}
                        className="transition hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-brand-600">
                          {opportunity.code}
                        </td>

                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-800 dark:text-white">
                            {opportunity.name}
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {opportunity.sector}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {opportunity.location}
                        </td>

                        <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-white">
                          {opportunity.value.toLocaleString(
                            "en-US",
                            {
                              maximumFractionDigits: 2,
                            }
                          )}{" "}
                          مليون دولار
                        </td>

                        <td className="px-6 py-4">
                          <Link
                            to={`/opportunities/${opportunity.code}`}
                            className="inline-flex rounded-lg bg-brand-50 px-3 py-2 text-sm font-medium text-brand-600 transition hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400"
                          >
                            عرض التفاصيل
                          </Link>
                        </td>
                      </tr>
                    )
                  )}

                  {opportunities.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-12 text-center text-sm text-gray-500"
                      >
                        لا توجد فرص جاهزة حاليًا.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}