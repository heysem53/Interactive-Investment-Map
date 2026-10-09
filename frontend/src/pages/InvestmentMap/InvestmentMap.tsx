import { Link } from "react-router";
import { useEffect, useMemo, useState } from "react";
import PageMeta from "../../components/common/PageMeta";

import type {
  Opportunity,
  OpportunityStatus,
} from "../../types/opportunity";

import { getOpportunities } from "../../services/opportunityService";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

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
   مركز الخريطة
========================================================= */

const DEIR_EZ_ZOR_CENTER: [number, number] = [
  35.335,
  40.14,
];

/* =========================================================
   الصفحة
========================================================= */

export default function InvestmentMap() {
  const [search, setSearch] = useState("");

  const [sector, setSector] = useState("الكل");

  const [status, setStatus] =
    useState<"الكل" | OpportunityStatus>("الكل");

  const [opportunities, setOpportunities] =
    useState<Opportunity[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /* =======================================================
     تحميل الفرص من API
  ======================================================= */

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getOpportunities();

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

  const activeCount =
    filteredOpportunities.filter(
      (item) => item.status === "نشطة"
    ).length;

  const readyCount =
    filteredOpportunities.filter(
      (item) => item.status === "جاهزة"
    ).length;

  const totalValue =
    filteredOpportunities.reduce(
      (sum, item) =>
        sum + item.value,
      0
    );

  /* =======================================================
     العرض
  ======================================================= */

  return (
    <>
      <PageMeta
        title="خارطة الاستثمار | خارطة الاستثمار الذكية"
        description="الخارطة الجغرافية للفرص الاستثمارية"
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
            خارطة الاستثمار
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            استكشاف وتوزيع الفرص الاستثمارية جغرافيًا
          </p>
        </div>

        {/* =================================================
            المؤشرات
        ================================================= */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <MapMetric
            title="الفرص الظاهرة"
            value={filteredOpportunities.length.toString()}
          />

          <MapMetric
            title="الفرص النشطة"
            value={activeCount.toString()}
          />

          <MapMetric
            title="الفرص الجاهزة"
            value={readyCount.toString()}
          />

          <MapMetric
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
                placeholder="ابحث عن فرصة أو موقع..."
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
                  transition
                  focus:border-brand-500
                  dark:border-gray-700
                  dark:bg-gray-900
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
            الخريطة والقائمة
        ================================================= */}

        <div className="grid grid-cols-12 gap-6">

          {/* =================================================
              الخريطة
          ================================================= */}

          <div className="col-span-12 xl:col-span-9">

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">

              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">

                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    التوزيع الجغرافي للفرص
                  </h2>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    دير الزور والمناطق المحيطة
                  </p>
                </div>

                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                  {filteredOpportunities.length} فرصة
                </span>

              </div>

              {/* =================================================
                  تحميل
              ================================================= */}

              {loading && (
                <div className="flex h-[620px] items-center justify-center bg-gray-100 dark:bg-gray-950">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    جاري تحميل الفرص الاستثمارية...
                  </div>
                </div>
              )}

              {/* =================================================
                  خطأ
              ================================================= */}

              {!loading && error && (
                <div className="flex h-[620px] items-center justify-center bg-gray-100 dark:bg-gray-950">
                  <div className="rounded-xl bg-white px-6 py-4 text-sm text-red-500 shadow-lg dark:bg-gray-900">
                    {error}
                  </div>
                </div>
              )}

              {/* =================================================
                  Leaflet Map
              ================================================= */}

              {!loading && !error && (
                <div className="h-[620px] w-full">

                  <MapContainer
                    center={DEIR_EZ_ZOR_CENTER}
                    zoom={9}
                    scrollWheelZoom={true}
                    className="h-full w-full"
                  >

                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {filteredOpportunities.map(
                      (opportunity) => {
                        const coordinates =
                          getOpportunityCoordinates(
                            opportunity
                          );

                        return (
                          <CircleMarker
                            key={opportunity.code}
                            center={coordinates}
                            radius={10}
                            pathOptions={{
                              color: "#ffffff",
                              weight: 3,
                              fillColor:
                                getLeafletMarkerColor(
                                  opportunity.status
                                ),
                              fillOpacity: 0.9,
                            }}
                          >
                            <Popup
                              closeButton={true}
                              closeOnClick={true}
                              autoPan={true}
                              autoClose={true}
                              offset={[0, -8]}
                              className="investment-map-popup"
                            >
                              <div
                                dir="rtl"
                                className="w-[270px] text-right"
                              >

                                {/* رأس البطاقة */}

                                <div className="mb-3 flex items-center justify-between gap-3 border-b border-gray-200 pb-2">

                                  <span className="text-xs font-bold text-brand-600">
                                    {opportunity.code}
                                  </span>

                                  <span
                                    className="rounded-full px-2 py-1 text-[10px] font-semibold text-white"
                                    style={{
                                      backgroundColor:
                                        getLeafletMarkerColor(
                                          opportunity.status
                                        ),
                                    }}
                                  >
                                    {opportunity.status}
                                  </span>

                                </div>

                                {/* اسم الفرصة */}

                                <div className="mb-3">

                                  <div className="text-sm font-bold leading-6 text-gray-800">
                                    {opportunity.name}
                                  </div>

                                </div>

                                {/* البيانات */}

                                <div className="space-y-2 text-xs text-gray-600">

                                  <div className="flex items-start gap-2">

                                    <span className="shrink-0 font-semibold text-gray-500">
                                      القطاع:
                                    </span>

                                    <span>
                                      {opportunity.sector}
                                    </span>

                                  </div>

                                  <div className="flex items-start gap-2">

                                    <span className="shrink-0 font-semibold text-gray-500">
                                      الموقع:
                                    </span>

                                    <span>
                                      {opportunity.location}
                                    </span>

                                  </div>

                                  <div className="flex items-start gap-2">

                                    <span className="shrink-0 font-semibold text-gray-500">
                                      القيمة:
                                    </span>

                                    <span className="font-semibold text-gray-700">
                                      {opportunity.value.toLocaleString(
                                        "en-US",
                                        {
                                          maximumFractionDigits: 2,
                                        }
                                      )}{" "}
                                      مليون دولار
                                    </span>

                                  </div>

                                </div>

                                {/* زر التفاصيل */}

                                <Link
                                  to={`/opportunities/${opportunity.code}`}
                                  className="mt-4 block !rounded-lg !bg-[#198754] !px-3 !py-2 !text-center !text-xs !font-semibold !leading-4 !text-white !no-underline transition hover:!bg-[#157347]"
                                >
                                  عرض تفاصيل الفرصة
                                </Link>

                              </div>
                            </Popup>
                          </CircleMarker>
                        );
                      }
                    )}

                  </MapContainer>

                </div>
              )}

            </div>

          </div>

          {/* =================================================
              قائمة الفرص
          ================================================= */}

          <div className="col-span-12 xl:col-span-3">

            <div className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">

              <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-800">

                <h2 className="font-semibold text-gray-800 dark:text-white">
                  الفرص على الخريطة
                </h2>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  اختر فرصة لعرض تفاصيلها
                </p>

              </div>

              <div className="max-h-[620px] overflow-y-auto">

                {!loading &&
                  !error &&
                  filteredOpportunities.map(
                    (opportunity) => (
                      <Link
                        key={opportunity.code}
                        to={`/opportunities/${opportunity.code}`}
                        className="flex w-full items-start gap-3 border-b border-gray-100 p-4 text-right transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.03]"
                      >

                        <span
                          className="
                            mt-1
                            h-3
                            w-3
                            shrink-0
                            rounded-full
                          "
                          style={{
                            backgroundColor:
                              getLeafletMarkerColor(
                                opportunity.status
                              ),
                          }}
                        />

                        <span className="min-w-0 flex-1">

                          <span className="block text-xs font-semibold text-brand-600">
                            {opportunity.code}
                          </span>

                          <span className="mt-1 block truncate text-sm font-medium text-gray-800 dark:text-white">
                            {opportunity.name}
                          </span>

                          <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">
                            {opportunity.location}
                          </span>

                          <span className="mt-1 block text-xs text-gray-400">
                            {opportunity.status}
                          </span>

                        </span>

                      </Link>
                    )
                  )}

                {!loading &&
                  !error &&
                  filteredOpportunities.length ===
                    0 && (
                    <div className="px-5 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                      لا توجد فرص مطابقة.
                    </div>
                  )}

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

/* =========================================================
   بطاقة المؤشر
========================================================= */

function MapMetric({
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
   لون Marker حسب الحالة
========================================================= */

function getLeafletMarkerColor(
  status: OpportunityStatus
): string {
  switch (status) {
    case "نشطة":
      return "#22c55e";

    case "جاهزة":
      return "#3b82f6";

    case "قيد الدراسة":
      return "#eab308";

    case "فرصة استراتيجية":
      return "#a855f7";

    case "فرصة جديدة":
      return "#3b82f6";

    case "إعادة تأهيل":
      return "#f97316";

    case "مغلقة":
      return "#6b7280";

    default:
      return "#6b7280";
  }
}

/* =========================================================
   إحداثيات الفرصة
========================================================= */

function getOpportunityCoordinates(
  opportunity: Opportunity
): [number, number] {

  /*
   * في المرحلة الحالية:
   * إذا كانت بيانات Opportunity تحتوي لاحقًا على
   * latitude / longitude سنستخدمها مباشرة.
   *
   * حاليًا نستخدم توزيعًا مؤقتًا حول دير الزور
   * حتى لا تتجمع جميع الفرص في نقطة واحدة.
   */

  const numericCode = Number(
    opportunity.code.replace("DZ-", "")
  );

  const angle =
    (numericCode * 137.5) % 360;

  const radius =
    0.015 +
    ((numericCode * 17) % 100) / 100 * 0.35;

  const radians =
    (angle * Math.PI) / 180;

  const latitude =
    DEIR_EZ_ZOR_CENTER[0] +
    Math.sin(radians) * radius;

  const longitude =
    DEIR_EZ_ZOR_CENTER[1] +
    Math.cos(radians) * radius * 1.3;

  return [
    latitude,
    longitude,
  ];
}
