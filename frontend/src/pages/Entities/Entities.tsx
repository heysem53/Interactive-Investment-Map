import PageMeta from "../../components/common/PageMeta";

export default function Entities() {
  return (
    <>
      <PageMeta
        title="الجهات والكيانات | خارطة الاستثمار"
        description="إدارة الجهات والكيانات المرتبطة بالفرص الاستثمارية"
      />

      <div dir="rtl" className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            الجهات والكيانات
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            الجهات والمؤسسات المرتبطة بالفرص الاستثمارية
          </p>
        </div>

        {/* Empty State */}
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-xl font-bold text-brand-500 dark:bg-brand-500/10">
            E
          </div>

          <h2 className="mt-5 text-lg font-semibold text-gray-800 dark:text-white">
            إدارة الجهات والكيانات
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
            سيتم لاحقًا ربط هذه الصفحة ببيانات الجهات الحكومية،
            والمؤسسات، والمستثمرين، والجهات المالكة أو المشرفة على
            الفرص الاستثمارية.
          </p>
        </div>
      </div>
    </>
  );
}