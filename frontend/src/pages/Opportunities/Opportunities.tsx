import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import type {
  Opportunity,
  OpportunityStatus,
} from "../../types/opportunity";

import {
  getOpportunities,
} from "../../services/opportunityService";
/* =========================================================
   القطاعات
========================================================= */

const sectors = [
  "الكل",
  "عقاري",
  "سياحي",
  "زراعي",
  "تعدين",
  "صناعي",
  "بيئي",
  "بنية تحتية",
  "خدمي",
  "نقل",
  "صحي",
];

/* =========================================================
   الحالات
========================================================= */

const statuses: Array<"الكل" | OpportunityStatus> = [
  "الكل",
  "فرصة استراتيجية",
  "فرصة جديدة",
  "إعادة تأهيل",
  "نشطة",
  "جاهزة",
  "قيد الدراسة",
  "مغلقة",
];

/* =========================================================
   الصفحة
========================================================= */

export default function Opportunities() {
  const [search, setSearch] = useState("");

  const [sector, setSector] = useState("الكل");

  const [status, setStatus] =
    useState<"الكل" | OpportunityStatus>("الكل");

  const [opportunities, setOpportunities] =
    useState<Opportunity[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  /* =======================================================
     تحميل البيانات
  ======================================================= */

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getOpportunities();

        /*
         * بعض الـAPIs تعيد:
         *
         * [
         *   {...},
         *   {...}
         * ]
         *
         * وبعضها قد يعيد:
         *
         * {
         *   opportunities: [...]
         * }
         */


        /* =================================================
           تحويل البيانات
        ================================================= */

        setOpportunities(data);
      } catch (err) {
        console.error(
          "Failed to load opportunities:",
          err
        );

        setError(
          "تعذر تحميل بيانات الفرص الاستثمارية من الخادم."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /* =======================================================
     البحث والتصفية
  ======================================================= */

  const filteredOpportunities = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    return opportunities.filter((opportunity) => {
      const matchesSearch =
        searchValue === "" ||
        opportunity.name
          .toLowerCase()
          .includes(searchValue) ||
        opportunity.code
          .toLowerCase()
          .includes(searchValue) ||
        opportunity.sector
          .toLowerCase()
          .includes(searchValue) ||
        opportunity.location
          .toLowerCase()
          .includes(searchValue);

      const matchesSector =
        sector === "الكل" ||
        opportunity.sector === sector;

      const matchesStatus =
        status === "الكل" ||
        opportunity.status === status;

      return (
        matchesSearch &&
        matchesSector &&
        matchesStatus
      );
    });
  }, [
    opportunities,
    search,
    sector,
    status,
  ]);

  /* =======================================================
     المؤشرات
  ======================================================= */

  const activeCount = opportunities.filter(
    (item) =>
      item.status === "نشطة"
  ).length;

  const readyCount = opportunities.filter(
    (item) =>
      item.status === "جاهزة"
  ).length;

  const totalValue = opportunities.reduce(
    (sum, opportunity) =>
      sum + opportunity.value,
    0
  );

  /* =======================================================
     العرض
  ======================================================= */

  return (
    <>
      <PageMeta
        title="الفرص الاستثمارية | خارطة الاستثمار الذكية"
        description="استعراض وإدارة وتحليل الفرص الاستثمارية"
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
            الفرص الاستثمارية
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            استعراض وإدارة وتحليل الفرص الاستثمارية المتاحة
          </p>
        </div>

        {/* =================================================
            المؤشرات
        ================================================= */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <MetricCard
            title="إجمالي الفرص"
            value={opportunities.length.toString()}
          />

          <MetricCard
            title="الفرص النشطة"
            value={activeCount.toString()}
          />

          <MetricCard
            title="الفرص الجاهزة"
            value={readyCount.toString()}
          />

          <MetricCard
            title="القيمة الاستثمارية"
            value={`${totalValue.toLocaleString(
              "en-US",
              {
                maximumFractionDigits: 2,
              }
            )} مليون`}
            suffix="دولار"
          />

        </div>

        {/* =================================================
            البحث والتصفية
        ================================================= */}

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            {/* البحث */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                البحث
              </label>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="ابحث باسم الفرصة أو الرمز أو الموقع..."
                className="
                  h-11
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  bg-transparent
                  px-4
                  text-sm
                  text-gray-800
                  outline-none
                  transition
                  focus:border-brand-500
                  dark:border-gray-700
                  dark:text-white
                "
              />
            </div>

            {/* القطاع */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                القطاع
              </label>

              <select
                value={sector}
                onChange={(event) =>
                  setSector(event.target.value)
                }
                className="
                  h-11
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  bg-white
                  px-4
                  text-sm
                  text-gray-800
                  outline-none
                  focus:border-brand-500
                  dark:border-gray-700
                  dark:bg-gray-900
                  dark:text-white
                "
              >
                {sectors.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* الحالة */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                الحالة
              </label>

              <select
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target.value as
                      | "الكل"
                      | OpportunityStatus
                  )
                }
                className="
                  h-11
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  bg-white
                  px-4
                  text-sm
                  text-gray-800
                  outline-none
                  focus:border-brand-500
                  dark:border-gray-700
                  dark:bg-gray-900
                  dark:text-white
                "
              >
                {statuses.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

          </div>

        </div>

        {/* =================================================
            قائمة الفرص
        ================================================= */}

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">

          {/* رأس القائمة */}

          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-800">

            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                قائمة الفرص الاستثمارية
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                عرض {filteredOpportunities.length} فرصة
              </p>
            </div>

            <Link
  to="/opportunities/new"
  className="
    inline-flex
    items-center
    rounded-lg
    bg-brand-500
    px-4
    py-2.5
    text-sm
    font-medium
    text-white
    transition
    hover:bg-brand-600
  "
>
  + إضافة فرصة
</Link>

          </div>

          {/* =================================================
              تحميل
          ================================================= */}

          {loading && (
            <div className="px-6 py-12 text-center text-sm text-gray-500">
              جاري تحميل الفرص الاستثمارية...
            </div>
          )}

          {/* =================================================
              خطأ
          ================================================= */}

          {!loading && error && (
            <div className="px-6 py-12 text-center text-sm text-red-500">
              {error}
            </div>
          )}

          {/* =================================================
              الجدول
          ================================================= */}

          {!loading && !error && (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[1000px] text-right">

                <thead className="bg-gray-50 dark:bg-white/[0.02]">

                  <tr>

                    <th className="px-6 py-4 text-sm font-medium text-gray-500">
                      الرمز
                    </th>

                    <th className="px-6 py-4 text-sm font-medium text-gray-500">
                      الفرصة الاستثمارية
                    </th>

                    <th className="px-6 py-4 text-sm font-medium text-gray-500">
                      القطاع
                    </th>

                    <th className="px-6 py-4 text-sm font-medium text-gray-500">
                      الموقع
                    </th>

                    <th className="px-6 py-4 text-sm font-medium text-gray-500">
                      الحالة
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

                  {filteredOpportunities.map(
                    (opportunity) => (

                      <tr
                        key={opportunity.code}
                        className="
                          cursor-pointer
                          transition
                          hover:bg-gray-50
                          dark:hover:bg-white/[0.02]
                        "
                        onClick={() => {
                          window.location.href =
                            `/opportunities/${opportunity.code}`;
                        }}
                      >

                        {/* الرمز */}

                        <td className="px-6 py-4 text-sm font-semibold text-brand-600">
                          {opportunity.code}
                        </td>

                        {/* الاسم */}

                        <td className="px-6 py-4">

                          <div className="font-medium text-gray-800 dark:text-white">
                            {opportunity.name}
                          </div>

                        </td>

                        {/* القطاع */}

                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {opportunity.sector}
                        </td>

                        {/* الموقع */}

                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {opportunity.location}
                        </td>

                        {/* الحالة */}

                        <td className="px-6 py-4">

                          <StatusBadge
                            status={opportunity.status}
                          />

                        </td>

                        {/* القيمة */}

                        <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-white">

                          {opportunity.value.toLocaleString(
                            "en-US",
                            {
                              maximumFractionDigits: 2,
                            }
                          )}

                          {" مليون دولار"}

                        </td>

                        {/* الإجراء */}

                        <td className="px-6 py-4">

                          <Link
                            to={`/opportunities/${opportunity.code}`}
                            onClick={(event) =>
                              event.stopPropagation()
                            }
                            className="
                              inline-flex
                              rounded-lg
                              bg-brand-50
                              px-3
                              py-2
                              text-sm
                              font-medium
                              text-brand-600
                              transition
                              hover:bg-brand-100
                              hover:text-brand-700
                              dark:bg-brand-500/10
                              dark:text-brand-400
                              dark:hover:bg-brand-500/20
                            "
                          >
                            عرض التفاصيل
                          </Link>

                        </td>

                      </tr>

                    )
                  )}

                  {filteredOpportunities.length ===
                    0 && (

                    <tr>

                      <td
                        colSpan={7}
                        className="px-6 py-12 text-center text-sm text-gray-500"
                      >
                        لا توجد فرص تطابق معايير البحث.
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

/* =========================================================
   Metric Card
========================================================= */

function MetricCard({
  title,
  value,
  suffix,
}: {
  title: string;
  value: string;
  suffix?: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {title}
      </p>

      <div className="mt-3 flex items-end gap-2">

        <span className="text-3xl font-bold text-gray-800 dark:text-white">
          {value}
        </span>

        {suffix && (
          <span className="mb-1 text-sm text-gray-500">
            {suffix}
          </span>
        )}

      </div>

    </div>
  );
}

/* =========================================================
   Status Badge
========================================================= */

function StatusBadge({
  status,
}: {
  status: OpportunityStatus;
}) {
  const styles: Record<
    OpportunityStatus,
    string
  > = {
    "فرصة استراتيجية":
      "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",

    "فرصة جديدة":
      "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",

    "إعادة تأهيل":
      "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",

    نشطة:
      "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400",

    جاهزة:
      "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",

    "قيد الدراسة":
      "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",

    مغلقة:
      "bg-gray-50 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        styles[status]
      }`}
    >
      {status}
    </span>
  );
}