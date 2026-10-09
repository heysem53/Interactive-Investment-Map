import PageMeta from "../../components/common/PageMeta";

export default function TablesData() {
  return (
    <>
      <PageMeta
        title="الجداول والبيانات | خارطة الاستثمار الذكية"
        description="استعراض البيانات والجداول الرئيسية لمنصة الاستثمار"
      />

      <div dir="rtl" className="space-y-6">

        {/* =================================================
            عنوان الصفحة
        ================================================= */}

        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            الجداول والبيانات
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            استعراض وتنظيم البيانات الرئيسية لمنصة الاستثمار
          </p>
        </div>

        {/* =================================================
            إحصائيات البيانات
        ================================================= */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <MetricCard
            title="الفرص الاستثمارية"
            value="36"
          />

          <MetricCard
            title="القطاعات"
            value="10"
          />

          <MetricCard
            title="المواقع والمناطق"
            value="—"
          />

          <MetricCard
            title="المستثمرون"
            value="—"
          />

        </div>

        {/* =================================================
            الجداول الرئيسية
        ================================================= */}

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">

          <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">

            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              الجداول الرئيسية
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              اختر مجموعة البيانات التي تريد استعراضها
            </p>

          </div>

          <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 xl:grid-cols-3">

            <DataCard
              title="الفرص الاستثمارية"
              description="بيانات ومعلومات الفرص الاستثمارية"
              path="/opportunities"
            />

            <DataCard
              title="القطاعات"
              description="القطاعات والقطاعات الفرعية الاستثمارية"
              path="/sectors"
            />

            <DataCard
              title="المواقع والمناطق"
              description="المحافظات والمناطق والمواقع الاستثمارية"
              path="/locations"
            />

            <DataCard
              title="المستثمرون"
              description="بيانات المستثمرين والجهات الاستثمارية"
              path="/investors"
            />

            <DataCard
              title="البيانات المالية"
              description="البيانات والقيم والمؤشرات المالية"
              path="/financial-data"
            />

            <DataCard
              title="العقود والاتفاقيات"
              description="العقود والاتفاقيات المرتبطة بالفرص"
              path="/contracts"
            />

          </div>

        </div>

        {/* =================================================
            حالة البيانات
        ================================================= */}

        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">

          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            حالة البيانات
          </h2>

          <div className="mt-5 space-y-4">

            <DataStatus
              title="قاعدة بيانات الفرص الاستثمارية"
              status="متصلة"
            />

            <DataStatus
              title="بيانات القطاعات"
              status="متصلة"
            />

            <DataStatus
              title="البيانات المالية"
              status="متصلة"
            />

            <DataStatus
              title="بيانات المستثمرين"
              status="قيد التطوير"
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
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {title}
      </p>

      <div className="mt-3">
        <span className="text-3xl font-bold text-gray-800 dark:text-white">
          {value}
        </span>
      </div>

    </div>
  );
}

/* =========================================================
   Data Card
========================================================= */

function DataCard({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return (
    <a
      href={path}
      className="group rounded-xl border border-gray-200 p-5 transition hover:border-brand-300 hover:bg-brand-50/40 hover:shadow-theme-sm dark:border-gray-800 dark:hover:border-brand-500/40 dark:hover:bg-brand-500/[0.03]"
    >

      <div className="flex items-start gap-4">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10 dark:text-brand-400">
          ▦
        </div>

        <div className="min-w-0">

          <h3 className="text-sm font-semibold text-gray-800 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
            {title}
          </h3>

          <p className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
            {description}
          </p>

        </div>

      </div>

      <div className="mt-4 text-xs font-medium text-brand-500">
        عرض البيانات ←
      </div>

    </a>
  );
}

/* =========================================================
   Data Status
========================================================= */

function DataStatus({
  title,
  status,
}: {
  title: string;
  status: "متصلة" | "قيد التطوير";
}) {
  const connected = status === "متصلة";

  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 dark:border-gray-800">

      <span className="text-sm text-gray-700 dark:text-gray-300">
        {title}
      </span>

      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${
          connected
            ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
            : "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
        }`}
      >
        {status}
      </span>

    </div>
  );
}