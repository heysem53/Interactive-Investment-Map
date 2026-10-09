import PageMeta from "../../components/common/PageMeta";

const attachments = [
  {
    name: "دراسة الجدوى الاقتصادية",
    type: "دراسة جدوى",
    opportunity: "DZ-001",
    format: "PDF",
    date: "2026-08-10",
  },
  {
    name: "مخطط الموقع العام",
    type: "مخطط",
    opportunity: "DZ-003",
    format: "PDF",
    date: "2026-08-08",
  },
  {
    name: "الوثائق القانونية",
    type: "وثيقة قانونية",
    opportunity: "DZ-005",
    format: "PDF",
    date: "2026-08-05",
  },
];

export default function Attachments() {
  return (
    <>
      <PageMeta
        title="الوثائق والمرفقات | خارطة الاستثمار الذكية"
        description="إدارة الوثائق والمرفقات المرتبطة بالفرص الاستثمارية"
      />

      <div dir="rtl" className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            الوثائق والمرفقات
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            استعراض وإدارة الوثائق والمرفقات الخاصة بالفرص الاستثمارية
          </p>
        </div>

        {/* المؤشرات */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <MetricCard
            title="إجمالي الوثائق"
            value={attachments.length.toString()}
          />

          <MetricCard
            title="وثائق PDF"
            value={attachments.filter(
              (item) => item.format === "PDF"
            ).length.toString()}
          />

          <MetricCard
            title="الفرص المرتبطة"
            value={
              new Set(
                attachments.map(
                  (item) => item.opportunity
                )
              ).size.toString()
            }
          />
        </div>

        {/* القائمة */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              قائمة الوثائق والمرفقات
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-right">
              <thead className="bg-gray-50 dark:bg-white/[0.02]">
                <tr>
                  <th className="px-6 py-4 text-sm text-gray-500">
                    الوثيقة
                  </th>
                  <th className="px-6 py-4 text-sm text-gray-500">
                    النوع
                  </th>
                  <th className="px-6 py-4 text-sm text-gray-500">
                    الفرصة
                  </th>
                  <th className="px-6 py-4 text-sm text-gray-500">
                    الصيغة
                  </th>
                  <th className="px-6 py-4 text-sm text-gray-500">
                    التاريخ
                  </th>
                  <th className="px-6 py-4 text-sm text-gray-500">
                    الإجراء
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {attachments.map((attachment) => (
                  <tr
                    key={attachment.name}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-white">
                      {attachment.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {attachment.type}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-brand-600">
                      {attachment.opportunity}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-white/10 dark:text-gray-300">
                        {attachment.format}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {attachment.date}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        type="button"
                        className="rounded-lg bg-brand-50 px-3 py-2 text-sm font-medium text-brand-600 hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400"
                      >
                        عرض
                      </button>
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