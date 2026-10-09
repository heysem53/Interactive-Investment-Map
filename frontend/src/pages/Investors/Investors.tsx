import PageMeta from "../../components/common/PageMeta";

const investors = [
  {
    name: "شركة الفرات للاستثمار",
    type: "شركة",
    sector: "عقاري",
    opportunities: 3,
    status: "نشط",
  },
  {
    name: "مستثمر خاص",
    type: "مستثمر فردي",
    sector: "زراعي",
    opportunities: 2,
    status: "مهتم",
  },
  {
    name: "شركة التنمية السياحية",
    type: "شركة",
    sector: "سياحي",
    opportunities: 4,
    status: "نشط",
  },
];

export default function Investors() {
  return (
    <>
      <PageMeta
        title="المستثمرون | خارطة الاستثمار الذكية"
        description="إدارة واستعراض المستثمرين والجهات الاستثمارية"
      />

      <div dir="rtl" className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            المستثمرون
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            استعراض وإدارة المستثمرين والجهات المهتمة بالفرص الاستثمارية
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <MetricCard
            title="إجمالي المستثمرين"
            value={investors.length.toString()}
          />

          <MetricCard
            title="المستثمرون النشطون"
            value={investors.filter(
              (item) => item.status === "نشط"
            ).length.toString()}
          />

          <MetricCard
            title="الفرص المرتبطة"
            value={investors
              .reduce(
                (sum, item) =>
                  sum + item.opportunities,
                0
              )
              .toString()}
          />
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              قائمة المستثمرين
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-right">
              <thead className="bg-gray-50 dark:bg-white/[0.02]">
                <tr>
                  <th className="px-6 py-4 text-sm text-gray-500">
                    المستثمر
                  </th>
                  <th className="px-6 py-4 text-sm text-gray-500">
                    النوع
                  </th>
                  <th className="px-6 py-4 text-sm text-gray-500">
                    القطاع
                  </th>
                  <th className="px-6 py-4 text-sm text-gray-500">
                    الفرص
                  </th>
                  <th className="px-6 py-4 text-sm text-gray-500">
                    الحالة
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {investors.map((investor) => (
                  <tr
                    key={investor.name}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-white">
                      {investor.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {investor.type}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {investor.sector}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-brand-600">
                      {investor.opportunities}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                        {investor.status}
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

      <p className="mt-3 text-3xl font-bold text-gray-800 dark:text-white">
        {value}
      </p>
    </div>
  );
}