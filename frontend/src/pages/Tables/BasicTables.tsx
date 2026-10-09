import PageMeta from "../../components/common/PageMeta";

export default function TablesData() {
  return (
    <>
      <PageMeta
        title="الجداول والبيانات | خارطة الاستثمار الذكية"
        description="الجداول والبيانات الاستثمارية للمنصة"
      />

      <div dir="rtl" className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            الجداول والبيانات
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            استعراض الجداول والبيانات الاستثمارية المرتبطة بالمنصة
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            قاعدة البيانات الاستثمارية
          </h2>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            سيتم هنا عرض الجداول والبيانات الاستثمارية وإتاحتها
            للتحليل والاستعراض.
          </p>
        </div>
      </div>
    </>
  );
}