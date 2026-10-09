import PageMeta from "../../components/common/PageMeta";

const financialData = [
  {
    opportunity: "DZ-001",
    name: "تطوير المدينة القديمة",
    investment: 25,
    revenue: 38,
    roi: 12.5,
    status: "جيد",
  },
  {
    opportunity: "DZ-003",
    name: "فندق الفرات",
    investment: 18,
    revenue: 27,
    roi: 10.8,
    status: "جيد",
  },
  {
    opportunity: "DZ-005",
    name: "مشروع زراعي",
    investment: 12,
    revenue: 21,
    roi: 14.2,
    status: "مرتفع",
  },
];

export default function FinancialData() {
  const totalInvestment = financialData.reduce(
    (sum, item) => sum + item.investment,
    0
  );

  const totalRevenue = financialData.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  return (
    <>
      <PageMeta
        title="البيانات المالية | خارطة الاستثمار الذكية"
        description="البيانات والمؤشرات المالية للفرص الاستثمارية"
      />

      <div dir="rtl" className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            البيانات المالية
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            استعراض وتحليل البيانات والمؤشرات المالية للفرص الاستثمارية
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="إجمالي الاستثمارات"
            value={`${totalInvestment} مليون`}
          />

          <MetricCard
            title="الإيرادات المتوقعة"
            value={`${totalRevenue} مليون`}
          />

          <MetricCard
            title="متوسط العائد"
            value={`${(
              financialData.reduce(
                (sum, item) => sum + item.roi,
                0
              ) / financialData.length
            ).toFixed(1)}%`}
          />

          <MetricCard
            title="الفرص المالية"
            value={financialData.length.toString()}
          />
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              المؤشرات المالية للفرص
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-right">
              <thead className="bg-gray-50 dark:bg-white/[0.02]">
                <tr>
                  <th className="px-6 py-4 text-sm text-gray-500">
                    الرمز
                  </th>

                  <th className="px-6 py-4 text-sm text-gray-500">
                    الفرصة
                  </th>

                  <th className="px-6 py-4 text-sm text-gray-500">
                    الاستثمار
                  </th>

                  <th className="px-6 py-4 text-sm text-gray-500">
                    الإيرادات
                  </th>

                  <th className="px-6 py-4 text-sm text-gray-500">
                    العائد ROI
                  </th>

                  <th className="px-6 py-4 text-sm text-gray-500">
                    التقييم
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {financialData.map((item) => (
                  <tr
                    key={item.opportunity}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-brand-600">
                      {item.opportunity}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-white">
                      {item.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {item.investment} مليون
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {item.revenue} مليون
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 dark:text-white">
                      {item.roi}%
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

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

      <p className="mt-3 text-2xl font-bold text-gray-800 dark:text-white">
        {value}
      </p>
    </div>
  );
}