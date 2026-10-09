import PageMeta from "../../components/common/PageMeta";

const contracts = [
  {
    number: "CNT-001",
    title: "اتفاقية تطوير المدينة القديمة",
    opportunity: "DZ-001",
    type: "اتفاقية استثمار",
    status: "نشط",
    startDate: "2026-01-15",
    endDate: "2031-01-15",
  },
  {
    number: "CNT-002",
    title: "عقد استثمار فندق الفرات",
    opportunity: "DZ-003",
    type: "عقد استثمار",
    status: "قيد المراجعة",
    startDate: "2026-03-01",
    endDate: "2036-03-01",
  },
];

export default function Contracts() {
  return (
    <>
      <PageMeta
        title="العقود والاتفاقيات | خارطة الاستثمار الذكية"
        description="إدارة العقود والاتفاقيات الاستثمارية"
      />

      <div dir="rtl" className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            العقود والاتفاقيات
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            إدارة ومتابعة العقود والاتفاقيات المرتبطة بالفرص الاستثمارية
          </p>
        </div>

        {/* المؤشرات */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <MetricCard
            title="إجمالي العقود"
            value={contracts.length.toString()}
          />

          <MetricCard
            title="العقود النشطة"
            value={contracts.filter(
              (item) => item.status === "نشط"
            ).length.toString()}
          />

          <MetricCard
            title="قيد المراجعة"
            value={contracts.filter(
              (item) => item.status === "قيد المراجعة"
            ).length.toString()}
          />
        </div>

        {/* الجدول */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              قائمة العقود والاتفاقيات
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-right">
              <thead className="bg-gray-50 dark:bg-white/[0.02]">
                <tr>
                  <th className="px-6 py-4 text-sm text-gray-500">
                    رقم العقد
                  </th>
                  <th className="px-6 py-4 text-sm text-gray-500">
                    العقد
                  </th>
                  <th className="px-6 py-4 text-sm text-gray-500">
                    الفرصة
                  </th>
                  <th className="px-6 py-4 text-sm text-gray-500">
                    النوع
                  </th>
                  <th className="px-6 py-4 text-sm text-gray-500">
                    الحالة
                  </th>
                  <th className="px-6 py-4 text-sm text-gray-500">
                    البداية
                  </th>
                  <th className="px-6 py-4 text-sm text-gray-500">
                    النهاية
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {contracts.map((contract) => (
                  <tr
                    key={contract.number}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-brand-600">
                      {contract.number}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-white">
                      {contract.title}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {contract.opportunity}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {contract.type}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                        {contract.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {contract.startDate}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {contract.endDate}
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