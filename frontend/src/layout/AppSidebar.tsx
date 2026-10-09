import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

import {
  GridIcon,
  MapIcon,
  PieChartIcon,
  LocationIcon,
  UserCircleIcon,
  DollarLineIcon,
  DocsIcon,
  FolderIcon,
  BoltIcon,
  TableIcon,
  ShootingStarIcon,
} from "../icons";

import { useSidebar } from "../context/SidebarContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: {
    name: string;
    path: string;
  }[];
};

/* =========================================================
   القائمة الرئيسية
========================================================= */

const navItems: NavItem[] = [
  {
    name: "لوحة التحكم",
    icon: <GridIcon />,
    path: "/",
  },
  {
    name: "الفرص الاستثمارية",
    icon: <ShootingStarIcon />,
    path: "/opportunities",
  },
  {
    name: "خارطة الاستثمار",
    icon: <MapIcon />,
    path: "/map",
  },
  {
    name: "القطاعات",
    icon: <PieChartIcon />,
    path: "/sectors",
  },
  {
    name: "المواقع والمناطق",
    icon: <LocationIcon />,
    path: "/locations",
  },
];

/* =========================================================
   إدارة الاستثمار
========================================================= */

const managementItems: NavItem[] = [
  {
    name: "المستثمرون",
    icon: <UserCircleIcon />,
    path: "/investors",
  },
  {
    name: "البيانات المالية",
    icon: <DollarLineIcon />,
    path: "/financial-data",
  },
  {
    name: "العقود والاتفاقيات",
    icon: <DocsIcon />,
    path: "/contracts",
  },
  {
    name: "الوثائق والمرفقات",
    icon: <FolderIcon />,
    path: "/attachments",
  },
];

/* =========================================================
   التحليل والتقارير
========================================================= */

const analysisItems: NavItem[] = [
  {
    name: "التحليل والذكاء الاصطناعي",
    icon: <BoltIcon />,
    path: "/ai-analysis",
  },
  {
    name: "التقارير والمؤشرات",
    icon: <PieChartIcon />,
    path: "/reports",
  },
  {
    name: "الجداول والبيانات",
    icon: <TableIcon />,
    path: "/tables",
  },
];

/* =========================================================
   Sidebar
========================================================= */

const AppSidebar: React.FC = () => {
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    setIsHovered,
  } = useSidebar();

  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "management" | "analysis";
    index: number;
  } | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<
    Record<string, number>
  >({});

  const subMenuRefs = useRef<
    Record<string, HTMLDivElement | null>
  >({});

  /* =========================================================
     Active Route
  ========================================================= */

  const isActive = useCallback(
    (path: string) => {
      return location.pathname === path;
    },
    [location.pathname]
  );

  /* =========================================================
     إغلاق القوائم الفرعية عند تغيير الصفحة
  ========================================================= */

  useEffect(() => {
    setOpenSubmenu(null);
  }, [location.pathname]);

  /* =========================================================
     حساب ارتفاع القائمة الفرعية
  ========================================================= */

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      const element = subMenuRefs.current[key];

      if (element) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: element.scrollHeight,
        }));
      }
    }
  }, [openSubmenu]);

  /* =========================================================
     Toggle Submenu
  ========================================================= */

  const handleSubmenuToggle = (
    index: number,
    menuType: "main" | "management" | "analysis"
  ) => {
    setOpenSubmenu((previous) => {
      if (
        previous &&
        previous.type === menuType &&
        previous.index === index
      ) {
        return null;
      }

      return {
        type: menuType,
        index,
      };
    });
  };

  const isSidebarVisible =
    isExpanded || isHovered || isMobileOpen;

  /* =========================================================
     Render Menu
  ========================================================= */

  const renderMenuItems = (
    items: NavItem[],
    menuType: "main" | "management" | "analysis"
  ) => {
    return (
      <ul className="flex flex-col gap-1">
        {items.map((nav, index) => {
          const active = nav.path
            ? isActive(nav.path)
            : false;

          /* =================================================
             Submenu
          ================================================= */

          if (nav.subItems) {
            const isOpen =
              openSubmenu?.type === menuType &&
              openSubmenu?.index === index;

            return (
              <li key={nav.name}>
                <button
                  type="button"
                  title={
                    !isSidebarVisible
                      ? nav.name
                      : undefined
                  }
                  onClick={() =>
                    handleSubmenuToggle(
                      index,
                      menuType
                    )
                  }
                  className={`menu-item group ${
                    isOpen
                      ? "menu-item-active"
                      : "menu-item-inactive"
                  } ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "lg:justify-start"
                  }`}
                >
                  <span
                    className={`menu-item-icon-size ${
                      isOpen
                        ? "menu-item-icon-active"
                        : "menu-item-icon-inactive"
                    }`}
                  >
                    {nav.icon}
                  </span>

                  {isSidebarVisible && (
                    <>
                      <span className="flex-1 text-right">
                        {nav.name}
                      </span>

                      <span
                        className={`mr-auto text-xs transition-transform duration-200 ${
                          isOpen
                            ? "rotate-180"
                            : ""
                        }`}
                      >
                        ▼
                      </span>
                    </>
                  )}
                </button>

                {isSidebarVisible && (
                  <div
                    ref={(element) => {
                      subMenuRefs.current[
                        `${menuType}-${index}`
                      ] = element;
                    }}
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      height: isOpen
                        ? `${
                            subMenuHeight[
                              `${menuType}-${index}`
                            ] || 0
                          }px`
                        : "0px",
                    }}
                  >
                    <ul className="mt-1 space-y-1 pr-9">
                      {nav.subItems.map(
                        (subItem) => (
                          <li
                            key={subItem.path}
                          >
                            <Link
                              to={subItem.path}
                              className={`menu-dropdown-item ${
                                isActive(
                                  subItem.path
                                )
                                  ? "menu-dropdown-item-active"
                                  : "menu-dropdown-item-inactive"
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </li>
            );
          }

          /* =================================================
             Normal Item
          ================================================= */

          return (
            <li key={nav.name}>
              <Link
                to={nav.path || "#"}
                title={
                  !isSidebarVisible
                    ? nav.name
                    : undefined
                }
                className={`menu-item group ${
                  active
                    ? "menu-item-active"
                    : "menu-item-inactive"
                } ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "lg:justify-start"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    active
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>

                {isSidebarVisible && (
                  <span className="flex-1 text-right">
                    {nav.name}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  /* =========================================================
     Section Title
  ========================================================= */

  const renderSectionTitle = (title: string) => {
    return (
      <h2
        className={`mb-3 flex items-center text-xs font-semibold tracking-wide text-gray-400 ${
          !isExpanded && !isHovered
            ? "lg:justify-center"
            : "justify-start"
        }`}
      >
        {isSidebarVisible ? (
          <>
            <span>{title}</span>

            <span className="mr-2 h-px flex-1 bg-gray-100 dark:bg-gray-800" />
          </>
        ) : (
          <span
            title={title}
            className="cursor-default text-[10px]"
          >
            •••
          </span>
        )}
      </h2>
    );
  };

  /* =========================================================
     Layout
  ========================================================= */

  return (
    <aside
      dir="rtl"
      className={`fixed right-0 top-0 z-50 flex h-screen flex-col border-l border-gray-200 bg-white text-gray-900 shadow-sm transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900 ${
        isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
          ? "w-[290px]"
          : "w-[90px]"
      } ${
        isMobileOpen
          ? "translate-x-0"
          : "translate-x-full"
      } lg:translate-x-0`}
      onMouseEnter={() => {
        if (!isExpanded) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {/* =====================================================
          الشعار
      ====================================================== */}

      <div
        className={`border-b border-gray-100 px-5 py-6 dark:border-gray-800 ${
          !isExpanded && !isHovered
            ? "lg:px-0"
            : ""
        }`}
      >
        {isSidebarVisible ? (
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex h-11 w-11 shrink-0 items-center justify-center"
            >
              <img
                src="/images/logo/Logo_sy.png"
                alt="خارطة الاستثمار الذكية"
                className="h-11 w-11 rounded-xl object-contain"
              />
            </Link>

            <div className="min-w-0">
              <div className="truncate text-base font-bold text-gray-800 dark:text-white">
                خارطة الاستثمار
              </div>

              <div className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                المنصة الذكية للاستثمار
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div
              title="خارطة الاستثمار"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-lg font-bold text-white shadow-theme-sm"
            >
              I
            </div>
          </div>
        )}
      </div>

      {/* =====================================================
          القائمة
      ====================================================== */}

      <div className="custom-scrollbar flex flex-1 flex-col overflow-y-auto px-4 py-6">
        {/* الرئيسية */}

        <div className="mb-7">
          {renderSectionTitle("الرئيسية")}

          {renderMenuItems(
            navItems,
            "main"
          )}
        </div>

        {/* إدارة الاستثمار */}

        <div className="mb-7">
          {renderSectionTitle(
            "إدارة الاستثمار"
          )}

          {renderMenuItems(
            managementItems,
            "management"
          )}
        </div>

        {/* التحليل والتقارير */}

        <div>
          {renderSectionTitle(
            "التحليل والتقارير"
          )}

          {renderMenuItems(
            analysisItems,
            "analysis"
          )}
        </div>
      </div>

           {/* =====================================================
          النظام الذكي
      ====================================================== */}

      <div
        className={`border-t border-gray-100 p-4 dark:border-gray-800 ${
          !isSidebarVisible
            ? "lg:flex lg:justify-center"
            : ""
        }`}
      >
        {isSidebarVisible ? (
          <Link
            to="/ai/opportunity-analysis/DZ-001"
            className="block rounded-xl bg-gray-50 p-3 transition hover:bg-brand-50 dark:bg-white/[0.03] dark:hover:bg-brand-500/5"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-sm font-bold text-brand-500 dark:bg-brand-500/10">
                AI
              </div>

              <div className="min-w-0">
                <div className="truncate text-xs font-semibold text-gray-800 dark:text-white">
                  النظام الذكي
                </div>

                <div className="truncate text-[11px] text-gray-500 dark:text-gray-400">
                  تحليل واستثمار قائم على البيانات
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <Link
            to="/ai-analysis"
            title="النظام الذكي"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-xs font-bold text-brand-500 transition hover:bg-brand-100 dark:bg-brand-500/10 dark:hover:bg-brand-500/20"
          >
            AI
          </Link>
        )}
      </div>
    </aside>
  );
};

export default AppSidebar;