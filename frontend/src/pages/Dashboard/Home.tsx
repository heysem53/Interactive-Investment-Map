import { Link } from "react-router";
import { useEffect, useState } from "react";

import PageMeta from "../../components/common/PageMeta";

import {
  ShootingStarIcon,
  BoltIcon,
  DollarLineIcon,
  PieChartIcon,
  LocationIcon,
  CheckCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MapIcon,
  DocsIcon,
} from "../../icons";

import {
  getOpportunities,
} from "../../services/opportunityService";

import type {
  Opportunity,
  OpportunityStatus,
} from "../../types/opportunity";

export default function Home() {
  /* =========================================================
     حالة البيانات
  ========================================================= */

  const [allOpportunities, setAllOpportunities] =
    useState<Opportunity[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /* =========================================================
     جلب البيانات من FastAPI
  ========================================================= */

  useEffect(() => {
    let mounted = true;

    async function loadOpportunities() {
      try {
        setLoading(true);
        setError(null);

        const data = await getOpportunities();

        if (mounted) {
          setAllOpportunities(data);
        }
      } catch (err) {
        console.error(
          "Failed to load opportunities:",
          err
        );

        if (mounted) {
          setError(
            "تعذر تحميل بيانات الفرص الاستثمارية"
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadOpportunities();

    return () => {
      mounted = false;
    };
  }, []);

  /* =========================================================
     حالة التحميل
  ========================================================= */

  if (loading) {
    return (
      <>
        <PageMeta
          title="لوحة التحكم | خارطة الاستثمار الذكية"
          description="لوحة التحكم الرئيسية لمنصة خارطة الاستثمار الذكية"
        />

        <div
          dir="rtl"
          className="flex min-h-[400px] items-center justify-center"
        >
          <div className="text-sm text-gray-500 dark:text-gray-400">
            جاري تحميل بيانات الفرص الاستثمارية...
          </div>
        </div>
      </>
    );
  }

  /* =========================================================
     حالة الخطأ
  ========================================================= */

  if (error) {
    return (
      <>
        <PageMeta
          title="لوحة التحكم | خارطة الاستثمار الذكية"
          description="لوحة التحكم الرئيسية لمنصة خارطة الاستثمار الذكية"
        />

        <div
          dir="rtl"
          className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700"
        >
          {error}
        </div>
      </>
    );
  }

  /* =========================================================
     البيانات الأساسية
  ========================================================= */

  const totalOpportunities =
    allOpportunities.length;

  const activeOpportunities =
  allOpportunities.filter(
    (opportunity) =>
      opportunity.status === "فرصة استراتيجية" ||
      opportunity.status === "فرصة جديدة" ||
      opportunity.status === "إعادة تأهيل"
  ).length;

const readyOpportunities =
  allOpportunities.filter(
    (opportunity) =>
      opportunity.readiness >= 80
  ).length;

const pendingOpportunities =
  allOpportunities.filter(
    (opportunity) =>
      opportunity.status === "قيد الدراسة"
  ).length;

const closedOpportunities =
  allOpportunities.filter(
    (opportunity) =>
      opportunity.status === "مغلقة"
  ).length;

const totalInvestment =
  allOpportunities.reduce(
    (total, opportunity) =>
      total + opportunity.value,
    0
  );

  const sectors = [
    ...new Set(
      allOpportunities.map(
        (opportunity) =>
          opportunity.sector
      )
    ),
  ];

  const locations = [
    ...new Set(
      allOpportunities.map(
        (opportunity) =>
          opportunity.location
      )
    ),
  ];

  /* =========================================================
     أعلى الفرص حسب القيمة
  ========================================================= */

  const topOpportunities = [
    ...allOpportunities,
  ]
    .sort(
      (a, b) =>
        b.value - a.value
    )
    .slice(0, 4);

  /* =========================================================
     أحدث الفرص
  ========================================================= */

  const latestOpportunities =
    allOpportunities
      .slice(-4)
      .reverse();

  /* =========================================================
     إحصائيات القطاعات والمناطق
  ========================================================= */

  const sectorStats =
    getSectorStats(
      allOpportunities
    );

  const locationStats =
    getLocationStats(
      allOpportunities
    );

  return (
    <>
      <PageMeta
        title="لوحة التحكم | خارطة الاستثمار الذكية"
        description="لوحة التحكم الرئيسية لمنصة خارطة الاستثمار الذكية"
      />

      <div
        dir="rtl"
        className="space-y-6"
      >
        {/* =====================================================
            رأس الصفحة
        ====================================================== */}

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              لوحة التحكم
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              نظرة شاملة على منظومة الفرص الاستثمارية ومؤشرات الأداء
            </p>
          </div>

          <div className="text-xs text-gray-400">
            آخر تحديث: اليوم
          </div>
        </div>

        {/* =====================================================
            المؤشرات الرئيسية
        ====================================================== */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <KpiCard
            title="إجمالي الفرص"
            value={totalOpportunities.toString()}
            percentage="المنصة"
            trend="neutral"
            icon={<ShootingStarIcon />}
          />

          <KpiCard
            title="الفرص النشطة"
            value={activeOpportunities.toString()}
            percentage={getPercentage(
              activeOpportunities,
              totalOpportunities
            )}
            trend="up"
            icon={<BoltIcon />}
          />

          <KpiCard
            title="جاهزة للاستثمار"
            value={readyOpportunities.toString()}
            percentage={getPercentage(
              readyOpportunities,
              totalOpportunities
            )}
            trend="up"
            icon={<CheckCircleIcon />}
          />

          <KpiCard
            title="القيمة الاستثمارية"
            value={formatInvestmentValue(
              totalInvestment
            )}
            percentage="USD"
            trend="neutral"
            icon={<DollarLineIcon />}
          />

          <KpiCard
            title="القطاعات"
            value={sectors.length.toString()}
            percentage="قطاع"
            trend="neutral"
            icon={<PieChartIcon />}
          />

          <KpiCard
            title="المناطق"
            value={locations.length.toString()}
            percentage="منطقة"
            trend="neutral"
            icon={<LocationIcon />}
          />
        </div>

        {/* =====================================================
            التحليل الرئيسي
        ====================================================== */}

        <div className="grid grid-cols-12 gap-6">
          {/* القطاعات */}

          <div className="col-span-12 xl:col-span-7">
            <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    توزيع الفرص حسب القطاعات
                  </h2>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    توزيع الفرص الاستثمارية الحالية على القطاعات الاقتصادية
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                  <PieChartIcon />
                </div>
              </div>

              <div className="mt-7 space-y-5">
                {sectorStats.map(
                  (sector) => (
                    <SectorBar
                      key={sector.name}
                      name={sector.name}
                      value={sector.value}
                      total={
                        totalOpportunities
                      }
                    />
                  )
                )}
              </div>
            </div>
          </div>

          {/* حالة الفرص */}

          <div className="col-span-12 xl:col-span-5">
            <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    حالة الفرص الاستثمارية
                  </h2>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    الحالة الحالية لمحفظة الفرص
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                  <BoltIcon />
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <StatusRow
                  label="نشطة"
                  value={
                    activeOpportunities
                  }
                  percentage={getPercentage(
                    activeOpportunities,
                    totalOpportunities
                  )}
                  type="active"
                />

                <StatusRow
                  label="جاهزة للاستثمار"
                  value={readyOpportunities}
                  percentage={getPercentage(
                    readyOpportunities,
                    totalOpportunities
                  )}
                  type="ready"
                />

                <StatusRow
                  label="قيد الدراسة"
                  value={
                    pendingOpportunities
                  }
                  percentage={getPercentage(
                    pendingOpportunities,
                    totalOpportunities
                  )}
                  type="pending"
                />

                <StatusRow
                  label="مغلقة"
                  value={
                    closedOpportunities
                  }
                  percentage={getPercentage(
                    closedOpportunities,
                    totalOpportunities
                  )}
                  type="closed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            الجغرافيا + أعلى الفرص
        ====================================================== */}

        <div className="grid grid-cols-12 gap-6">
          {/* التوزيع الجغرافي */}

          <div className="col-span-12 xl:col-span-5">
            <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    التوزيع الجغرافي
                  </h2>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    توزيع الفرص حسب المناطق والوحدات الإدارية
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                  <LocationIcon />
                </div>
              </div>

              <div className="mt-7 space-y-5">
                {locationStats.map(
                  (location) => (
                    <LocationRow
                      key={location.name}
                      name={location.name}
                      value={location.value}
                      percentage={getPercentage(
                        location.value,
                        totalOpportunities
                      )}
                    />
                  )
                )}
              </div>

              <Link
                to="/map"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
              >
                <MapIcon />
              
                <span>
                  استعراض الخارطة الاستثمارية
                </span>
              </Link>

            </div>
          </div>

          {/* أعلى الفرص */}

          <div className="col-span-12 xl:col-span-7">
            <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    أبرز الفرص الاستثمارية
                  </h2>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    الفرص الأعلى من حيث القيمة الاستثمارية التقديرية
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                  <DollarLineIcon />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {topOpportunities.map(
                  (opportunity) => (
                    <TopOpportunity
                      key={
                        opportunity.code
                      }
                      code={
                        opportunity.code
                      }
                      name={
                        opportunity.name
                      }
                      sector={
                        opportunity.sector
                      }
                      value={`${opportunity.value}M USD`}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            إجراءات سريعة
        ====================================================== */}

        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            الوصول السريع
          </h2>
        
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Link to="/opportunities">
              <QuickAction
                icon={<ShootingStarIcon />}
                title="الفرص الاستثمارية"
                description="استعراض وإدارة الفرص"
              />
            </Link>
        
            <Link to="/map">
              <QuickAction
                icon={<MapIcon />}
                title="خارطة الاستثمار"
                description="استعراض التوزيع الجغرافي"
              />
            </Link>
        
            <Link to="/ai/opportunity-analysis">
              <QuickAction
                icon={<BoltIcon />}
                title="التحليل والذكاء الاصطناعي"
                description="تحليل وتقييم الفرص"
              />
            </Link>
        
            <Link to="/reports">
              <QuickAction
                icon={<DocsIcon />}
                title="التقارير والمؤشرات"
                description="عرض التقارير والتحليلات"
              />
            </Link>
          </div>
        </div>

        {/* =====================================================
            أحدث الفرص
        ====================================================== */}

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex flex-col gap-3 border-b border-gray-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                أحدث الفرص الاستثمارية
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                آخر الفرص المضافة إلى المنصة
              </p>
            </div>

            <button
              type="button"
              className="text-sm font-medium text-brand-500 hover:text-brand-600"
            >
              عرض جميع الفرص
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-right">
              <thead className="bg-gray-50 dark:bg-white/[0.02]">
                <tr>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500">
                    الرمز
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-gray-500">
                    اسم الفرصة
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-gray-500">
                    القطاع
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-gray-500">
                    الحالة
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-gray-500">
                    القيمة التقديرية
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {latestOpportunities.map(
                  (opportunity) => (
                    <OpportunityRow
                      key={
                        opportunity.code
                      }
                      code={
                        opportunity.code
                      }
                      name={
                        opportunity.name
                      }
                      sector={
                        opportunity.sector
                      }
                      status={
                        opportunity.status
                      }
                      value={`${opportunity.value}M USD`}
                    />
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   Helpers
========================================================= */

function getPercentage(
  value: number,
  total: number
): string {
  if (total === 0) {
    return "0%";
  }

  return `${(
    (value / total) *
    100
  ).toFixed(1)}%`;
}

function formatInvestmentValue(
  value: number
): string {
  if (value >= 1000) {
    return `${(
      value / 1000
    ).toFixed(1)}B`;
  }

  return `${value}M`;
}

function getSectorStats(
  items: Opportunity[]
) {
  const counts: Record<
    string,
    number
  > = {};

  items.forEach(
    (opportunity) => {
      counts[
        opportunity.sector
      ] =
        (counts[
          opportunity.sector
        ] || 0) + 1;
    }
  );

  return Object.entries(
    counts
  )
    .map(
      ([name, value]) => ({
        name,
        value,
      })
    )
    .sort(
      (a, b) =>
        b.value - a.value
    );
}

function getLocationStats(
  items: Opportunity[]
) {
  const counts: Record<
    string,
    number
  > = {};

  items.forEach(
    (opportunity) => {
      counts[
        opportunity.location
      ] =
        (counts[
          opportunity.location
        ] || 0) + 1;
    }
  );

  return Object.entries(
    counts
  )
    .map(
      ([name, value]) => ({
        name,
        value,
      })
    )
    .sort(
      (a, b) =>
        b.value - a.value
    )
    .slice(0, 5);
}

/* =========================================================
   KPI CARD
========================================================= */

function KpiCard({
  title,
  value,
  percentage,
  trend,
  icon,
}: {
  title: string;
  value: string;
  percentage: string;
  trend:
    | "up"
    | "down"
    | "neutral";
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
          {icon}
        </div>

        {trend === "up" && (
          <span className="flex items-center gap-1 text-xs font-medium text-green-600">
            <ArrowUpIcon />
            {percentage}
          </span>
        )}

        {trend === "down" && (
          <span className="flex items-center gap-1 text-xs font-medium text-red-500">
            <ArrowDownIcon />
            {percentage}
          </span>
        )}

        {trend === "neutral" && (
          <span className="text-xs text-gray-400">
            {percentage}
          </span>
        )}
      </div>

      <div className="mt-5">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {title}
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-800 dark:text-white">
          {value}
        </h2>
      </div>
    </div>
  );
}

/* =========================================================
   Sector Bar
========================================================= */

function SectorBar({
  name,
  value,
  total,
}: {
  name: string;
  value: number;
  total: number;
}) {
  const percentage =
    total === 0
      ? 0
      : Math.round(
          (value / total) * 100
        );

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {name}
        </span>

        <span className="text-sm text-gray-500">
          {value} فرصة
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <div
          className="h-full rounded-full bg-brand-500 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   Status Row
========================================================= */

function StatusRow({
  label,
  value,
  percentage,
  type,
}: {
  label: string;
  value: number;
  percentage: string;
  type:
    | "active"
    | "ready"
    | "pending"
    | "closed";
}) {
  const dotClass = {
    active: "bg-green-500",
    ready: "bg-blue-500",
    pending:
      "bg-yellow-500",
    closed:
      "bg-gray-400",
  }[type];

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span
          className={`h-3 w-3 rounded-full ${dotClass}`}
        />

        <span className="text-sm text-gray-700 dark:text-gray-300">
          {label}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-semibold text-gray-800 dark:text-white">
          {value}
        </span>

        <span className="text-sm text-gray-500">
          {percentage}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   Location Row
========================================================= */

function LocationRow({
  name,
  value,
  percentage,
}: {
  name: string;
  value: number;
  percentage: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-brand-500 dark:bg-white/[0.03]">
          <LocationIcon />
        </div>

        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {name}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-semibold text-gray-800 dark:text-white">
          {value}
        </span>

        <span className="text-xs text-gray-400">
          {percentage}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   Top Opportunity
========================================================= */

function TopOpportunity({
  code,
  name,
  sector,
  value,
}: {
  code: string;
  name: string;
  sector: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
          <ShootingStarIcon />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-brand-500">
              {code}
            </span>

            <span className="truncate text-sm font-semibold text-gray-800 dark:text-white">
              {name}
            </span>
          </div>

          <p className="mt-1 text-xs text-gray-500">
            {sector}
          </p>
        </div>
      </div>

      <span className="shrink-0 text-sm font-bold text-gray-800 dark:text-white">
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   Quick Action
========================================================= */

function QuickAction({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 text-right transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-theme-sm dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-brand-500/30"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white dark:bg-brand-500/10">
        {icon}
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>

        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </button>
  );
}

/* =========================================================
   Opportunity Row
========================================================= */

function OpportunityRow({
  code,
  name,
  sector,
  status,
  value,
}: {
  code: string;
  name: string;
  sector: string;
  status: OpportunityStatus;
  value: string;
}) {
    const statusClass =
    status === "فرصة استراتيجية"
      ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
      : status === "فرصة جديدة"
      ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
      : status === "إعادة تأهيل"
      ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
      : status === "قيد الدراسة"
      ? "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400"
      : status === "مغلقة"
      ? "bg-gray-50 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400"
      : "bg-gray-50 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400";

  return (
    <tr className="transition hover:bg-gray-50 dark:hover:bg-white/[0.02]">
      <td className="px-6 py-4 text-sm font-semibold text-brand-600">
        {code}
      </td>

      <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-white">
        {name}
      </td>

      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
        {sector}
      </td>

      <td className="px-6 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}
        >
          {status}
        </span>
      </td>

      <td className="px-6 py-4 text-sm font-semibold text-gray-800 dark:text-white">
        {value}
      </td>
    </tr>
  );
}