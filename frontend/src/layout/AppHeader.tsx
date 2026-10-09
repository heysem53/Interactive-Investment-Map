import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

import { useSidebar } from "../context/SidebarContext";

import { ThemeToggleButton } from "../components/common/ThemeToggleButton";
import NotificationDropdown from "../components/header/NotificationDropdown";
import UserDropdown from "../components/header/UserDropdown";

import {
  GridIcon,
  ShootingStarIcon,
  MapIcon,
  PieChartIcon,
  LocationIcon,
  UserCircleIcon,
  DollarLineIcon,
  DocsIcon,
  FolderIcon,
  BoltIcon,
  TableIcon,
} from "../icons";

const AppHeader: React.FC = () => {
  const location = useLocation();

  const [isApplicationMenuOpen, setApplicationMenuOpen] =
    useState(false);

  const {
    isMobileOpen,
    toggleSidebar,
    toggleMobileSidebar,
  } = useSidebar();

  const inputRef = useRef<HTMLInputElement>(null);

  /* =========================================================
     Sidebar
  ========================================================= */

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  /* =========================================================
     Mobile tools
  ========================================================= */

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen((prev) => !prev);
  };

  /* =========================================================
     Search shortcut
  ========================================================= */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* =========================================================
     Page information
  ========================================================= */

  const pageInfo = (() => {
    switch (location.pathname) {
      case "/":
        return {
          title: "لوحة التحكم",
          subtitle: "نظرة شاملة على منظومة الاستثمار",
          icon: <GridIcon />,
        };

      case "/opportunities":
        return {
          title: "الفرص الاستثمارية",
          subtitle: "استعراض وإدارة الفرص الاستثمارية",
          icon: <ShootingStarIcon />,
        };

      case "/map":
        return {
          title: "خارطة الاستثمار",
          subtitle: "استكشاف الفرص والمواقع الاستثمارية",
          icon: <MapIcon />,
        };

      case "/sectors":
        return {
          title: "القطاعات",
          subtitle: "القطاعات والمجالات الاستثمارية",
          icon: <PieChartIcon />,
        };

      case "/locations":
        return {
          title: "المواقع والمناطق",
          subtitle: "المواقع والوحدات والمناطق الاستثمارية",
          icon: <LocationIcon />,
        };

      case "/investors":
        return {
          title: "المستثمرون",
          subtitle: "إدارة المستثمرين والجهات الاستثمارية",
          icon: <UserCircleIcon />,
        };

      case "/financial-data":
        return {
          title: "البيانات المالية",
          subtitle: "البيانات والتقديرات المالية للمشاريع",
          icon: <DollarLineIcon />,
        };

      case "/contracts":
        return {
          title: "العقود والاتفاقيات",
          subtitle: "إدارة العقود والاتفاقيات الاستثمارية",
          icon: <DocsIcon />,
        };

      case "/attachments":
        return {
          title: "الوثائق والمرفقات",
          subtitle: "إدارة الوثائق والملفات المرتبطة بالفرص",
          icon: <FolderIcon />,
        };

      case "/ai-analysis":
        return {
          title: "التحليل والذكاء الاصطناعي",
          subtitle: "تحليل البيانات ودعم القرار الاستثماري",
          icon: <BoltIcon />,
        };

      case "/reports":
        return {
          title: "التقارير والمؤشرات",
          subtitle: "المؤشرات والتقارير الاستثمارية",
          icon: <PieChartIcon />,
        };

      case "/tables":
        return {
          title: "الجداول والبيانات",
          subtitle: "استعراض البيانات وقواعد المعلومات",
          icon: <TableIcon />,
        };

      default:
        return {
          title: "منصة الاستثمار",
          subtitle: "المنصة الذكية للاستثمار",
          icon: <GridIcon />,
        };
    }
  })();

  /* =========================================================
     Render
  ========================================================= */

  return (
    <header
      dir="rtl"
      className="
        sticky
        top-0
        z-[9999]
        w-full
        border-b
        border-gray-200
        bg-white/95
        shadow-sm
        backdrop-blur
        dark:border-gray-800
        dark:bg-gray-900/95
      "
    >
      <div
        className="
          flex
          min-h-[76px]
          w-full
          items-center
          justify-between
          gap-4
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}

        <div className="flex min-w-0 items-center gap-3">
          {/* Sidebar button */}

          <button
            type="button"
            onClick={handleToggle}
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-gray-200
              bg-white
              text-gray-600
              transition
              hover:border-brand-300
              hover:bg-brand-50
              hover:text-brand-500
              dark:border-gray-800
              dark:bg-gray-900
              dark:text-gray-400
              dark:hover:border-brand-500/30
              dark:hover:bg-brand-500/10
              dark:hover:text-brand-400
            "
            aria-label="فتح أو إغلاق القائمة الجانبية"
          >
            {isMobileOpen ? (
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 6L18 18M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>

          {/* Mobile logo */}

          <Link
            to="/"
            className="
              flex
              shrink-0
              items-center
              lg:hidden
            "
          >
            <img
              className="h-8 w-auto dark:hidden"
              src="/images/logo/Logo_sy.png"
              alt="خارطة الاستثمار الذكية"
            />

            <img
              className="hidden h-8 w-auto dark:block"
              src="/images/logo/Logo_sy.png"
              alt="خارطة الاستثمار الذكية"
            />
          </Link>

          {/* Page title */}

          <div
            className="
              hidden
              min-w-0
              items-center
              gap-3
              border-r
              border-gray-200
              pr-4
              md:flex
              dark:border-gray-800
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-brand-50
                text-brand-500
                dark:bg-brand-500/10
                dark:text-brand-400
              "
            >
              <span className="h-5 w-5">
                {pageInfo.icon}
              </span>
            </div>

            <div className="min-w-0">
              <h1
                className="
                  truncate
                  text-sm
                  font-bold
                  text-gray-800
                  dark:text-white
                "
              >
                {pageInfo.title}
              </h1>

              <p
                className="
                  mt-0.5
                  hidden
                  truncate
                  text-xs
                  text-gray-400
                  lg:block
                  dark:text-gray-500
                "
              >
                {pageInfo.subtitle}
              </p>
            </div>
          </div>

          {/* Search */}

          <div className="hidden lg:block">
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div className="relative">
                {/* Search icon */}

                <span
                  className="
                    pointer-events-none
                    absolute
                    right-3.5
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    dark:text-gray-500
                  "
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="
                        M9.375 1.75
                        C5.17 1.75 1.75 5.17 1.75 9.375
                        C1.75 13.58 5.17 17 9.375 17
                        C11.27 17 13.005 16.305 14.34 15.17
                        L17.3 18.13
                      "
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />

                    <path
                      d="
                        M14.3 14.3
                        L18.1 18.1
                      "
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>

                <input
                  ref={inputRef}
                  type="text"
                  dir="rtl"
                  placeholder="البحث في منصة الاستثمار..."
                  className="
                    h-10
                    w-[300px]
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    py-2
                    pl-16
                    pr-11
                    text-right
                    text-sm
                    text-gray-800
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-brand-300
                    focus:bg-white
                    focus:ring-4
                    focus:ring-brand-500/10
                    dark:border-gray-800
                    dark:bg-white/[0.03]
                    dark:text-white
                    dark:placeholder:text-white/30
                    dark:focus:border-brand-500/40
                    xl:w-[360px]
                  "
                />

                {/* Shortcut */}

                <span
                  className="
                    absolute
                    left-2
                    top-1/2
                    flex
                    -translate-y-1/2
                    items-center
                    gap-1
                    rounded-md
                    border
                    border-gray-200
                    bg-white
                    px-1.5
                    py-1
                    text-[10px]
                    font-medium
                    text-gray-400
                    shadow-sm
                    dark:border-gray-700
                    dark:bg-gray-800
                    dark:text-gray-500
                  "
                >
                  <span>Ctrl</span>
                  <span>+</span>
                  <span>K</span>
                </span>
              </div>
            </form>
          </div>
        </div>

        {/* =====================================================
            LEFT SIDE
        ====================================================== */}

        <div className="relative flex shrink-0 items-center gap-2">
          {/* Mobile tools */}

          <button
            type="button"
            onClick={toggleApplicationMenu}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-gray-200
              text-gray-600
              transition
              hover:bg-gray-100
              dark:border-gray-800
              dark:text-gray-400
              dark:hover:bg-gray-800
              lg:hidden
            "
            aria-label="فتح أدوات النظام"
            aria-expanded={isApplicationMenuOpen}
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="5"
                cy="12"
                r="1.6"
                fill="currentColor"
              />
              <circle
                cx="12"
                cy="12"
                r="1.6"
                fill="currentColor"
              />
              <circle
                cx="19"
                cy="12"
                r="1.6"
                fill="currentColor"
              />
            </svg>
          </button>

          {/* Desktop tools */}

          <div className="hidden items-center gap-1.5 lg:flex">
            {/* Theme */}

            <div
              className="
                rounded-xl
                transition
                hover:bg-gray-100
                dark:hover:bg-gray-800
              "
              title="تغيير المظهر"
            >
              <ThemeToggleButton />
            </div>

            {/* Notifications */}

            <div
              className="
                rounded-xl
                transition
                hover:bg-gray-100
                dark:hover:bg-gray-800
              "
              title="الإشعارات"
            >
              <NotificationDropdown />
            </div>

            {/* User */}

            <div
              className="
                rounded-xl
                transition
                hover:bg-gray-100
                dark:hover:bg-gray-800
              "
              title="حساب المستخدم"
            >
              <UserDropdown />
            </div>
          </div>

          {/* Mobile tools panel */}

          {isApplicationMenuOpen && (
            <div
              className="
                absolute
                left-0
                top-14
                z-[10000]
                flex
                items-center
                gap-2
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-2
                shadow-xl
                dark:border-gray-800
                dark:bg-gray-900
              "
            >
              <div title="تغيير المظهر">
                <ThemeToggleButton />
              </div>

              <div title="الإشعارات">
                <NotificationDropdown />
              </div>

              <div title="حساب المستخدم">
                <UserDropdown />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          Mobile page title
      ====================================================== */}

      <div
        className="
          flex
          items-center
          gap-3
          border-t
          border-gray-100
          px-4
          py-3
          md:hidden
          dark:border-gray-800
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-brand-50
            text-brand-500
            dark:bg-brand-500/10
            dark:text-brand-400
          "
        >
          <span className="h-4.5 w-4.5">
            {pageInfo.icon}
          </span>
        </div>

        <div className="min-w-0">
          <h1
            className="
              truncate
              text-sm
              font-bold
              text-gray-800
              dark:text-white
            "
          >
            {pageInfo.title}
          </h1>

          <p
            className="
              truncate
              text-[11px]
              text-gray-400
              dark:text-gray-500
            "
          >
            {pageInfo.subtitle}
          </p>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;