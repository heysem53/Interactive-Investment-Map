import PageMeta from "../../components/common/PageMeta";

const locations = [
  {
    name: "مدينة دير الزور",
    type: "مدينة",
    opportunities: 12,
  },
  {
    name: "الميادين",
    type: "منطقة",
    opportunities: 8,
  },
  {
    name: "البوكمال",
    type: "منطقة",
    opportunities: 6,
  },
  {
    name: "المنطقة الصناعية",
    type: "منطقة صناعية",
    opportunities: 5,
  },
];

export default function Locations() {
  return (
    <>
      <PageMeta
        title="المواقع والمناطق | خارطة الاستثمار الذكية"
        description="المواقع والمناطق والوحدات الإدارية الاستثمارية"
      />

      <div dir="rtl" className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            المواقع والمناطق
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            إدارة واستعراض المواقع والمناطق والوحدات الإدارية المرتبطة بالفرص الاستثمارية
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <MetricCard
            title="إجمالي المواقع"
            value={locations.length.toString()}
          />

          <MetricCard
            title="المدن والمناطق"
            value={locations.filter(
              (item) =>
                item.type === "مدينة" ||
                item.type === "منطقة"
            ).length.toString()}
          />

          <MetricCard
            title="الفرص المرتبطة"
            value={locations
              .reduce(
                (sum, item) =>
                  sum + item.opportunities,
                0
              )
              .toString()}
          />
        </div>

        <DataTable />
      </div>
    </>
  );
}

function DataTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          المواقع والمناطق
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-right">
          <thead className="bg-gray-50 dark:bg-white/[0.02]">
            <tr>
              <th className="px-6 py-4 text-sm text-gray-500">
                الموقع
              </th>

              <th className="px-6 py-4 text-sm text-gray-500">
                النوع
              </th>

              <th className="px-6 py-4 text-sm text-gray-500">
                عدد الفرص
              </th>

              <th className="px-6 py-4 text-sm text-gray-500">
                الحالة
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {locations.map((location) => (
              <tr
                key={location.name}
                className="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-white">
                  {location.name}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {location.type}
                </td>

                <td className="px-6 py-4 text-sm font-semibold text-brand-600">
                  {location.opportunities}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                    نشط
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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