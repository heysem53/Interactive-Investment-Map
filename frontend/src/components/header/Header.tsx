import { useState } from "react";
import { ThemeToggleButton } from "../common/ThemeToggleButton";
import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";
import { Link } from "react-router";

interface HeaderProps {
  onClick?: () => void;
  onToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClick, onToggle }) => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen((prev) => !prev);
  };

  return (
    <header
      dir="rtl"
      className="
        sticky
        top-0
        z-[9999]
        flex
        w-full
        border-gray-200
        bg-white
        dark:border-gray-800
        dark:bg-gray-900
        lg:border-b
      "
    >
      <div className="flex w-full grow flex-col lg:flex-row lg:px-6">
        {/* ============================= */}
        {/* الصف الرئيسي */}
        {/* ============================= */}

        <div
          className="
            flex
            w-full
            items-center
            justify-between
            gap-2
            border-b
            border-gray-200
            px-3
            py-3
            dark:border-gray-800
            sm:gap-4
            lg:border-b-0
            lg:px-0
            lg:py-4
          "
        >
          {/* ============================= */}
          {/* الجهة اليمنى - زر Sidebar + الشعار */}
          {/* ============================= */}

          <div className="flex items-center gap-2">
            {/* زر Sidebar للموبايل */}
            <button
              type="button"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-lg
                text-gray-500
                hover:bg-gray-100
                dark:text-gray-400
                dark:hover:bg-gray-800
                lg:hidden
              "
              onClick={onToggle}
              aria-label="فتح القائمة الجانبية"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M4 12H20"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M4 18H20"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* زر Sidebar للشاشات الكبيرة */}
            <button
              type="button"
              onClick={onClick}
              className="
                hidden
                h-11
                w-11
                items-center
                justify-center
                rounded-lg
                border
                border-gray-200
                text-gray-500
                hover:bg-gray-100
                dark:border-gray-800
                dark:text-gray-400
                dark:hover:bg-gray-800
                lg:flex
              "
              aria-label="فتح أو إغلاق القائمة الجانبية"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M4 12H20"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M4 18H20"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* الشعار للموبايل */}
            <Link to="/" className="lg:hidden">
              <img
                className="h-9 w-auto dark:hidden"
                src="/images/logo/Logo_sy.png"
                alt="خارطة الاستثمار الذكية"
              />

              <img
                className="hidden h-9 w-auto dark:block"
                src="/images/logo/Logo_sy.png"
                alt="خارطة الاستثمار الذكية"
              />
            </Link>
          </div>

          {/* ============================= */}
          {/* البحث */}
          {/* ============================= */}

          <div className="hidden flex-1 px-8 lg:block">
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div className="relative max-w-[430px]">
                {/* أيقونة البحث */}
                <span
                  className="
                    pointer-events-none
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                  "
                >
                  <svg
                    className="fill-gray-500 dark:fill-gray-400"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.375 1.542C5.049 1.542 1.542 5.048 1.542 9.374C1.542 13.699 5.049 17.205 9.375 17.205C11.267 17.205 13.003 16.535 14.357 15.418L17.177 18.238C17.47 18.531 17.945 18.531 18.238 18.238C18.531 17.945 18.531 17.47 18.238 17.177L15.418 14.357C16.536 13.003 17.208 11.267 17.208 9.374C17.208 5.048 13.701 1.542 9.375 1.542ZM3.042 9.374C3.042 5.877 5.877 3.042 9.375 3.042C12.873 3.042 15.708 5.877 15.708 9.374C15.708 12.87 12.873 15.705 9.375 15.705C5.877 15.705 3.042 12.87 3.042 9.374Z"
                    />
                  </svg>
                </span>

                <input
                  type="text"
                  dir="rtl"
                  placeholder="البحث في منصة الاستثمار..."
                  className="
                    h-11
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    bg-transparent
                    py-2.5
                    pl-14
                    pr-12
                    text-right
                    text-sm
                    text-gray-800
                    shadow-theme-xs
                    outline-none
                    placeholder:text-gray-400
                    focus:border-brand-300
                    focus:ring-3
                    focus:ring-brand-500/10
                    dark:border-gray-800
                    dark:bg-gray-900
                    dark:text-white/90
                    dark:placeholder:text-white/30
                    xl:w-[430px]
                  "
                />

                {/* اختصار البحث */}
                <span
                  className="
                    absolute
                    left-2.5
                    top-1/2
                    inline-flex
                    -translate-y-1/2
                    items-center
                    gap-1
                    rounded-lg
                    border
                    border-gray-200
                    bg-gray-50
                    px-2
                    py-1
                    text-xs
                    text-gray-500
                    dark:border-gray-800
                    dark:bg-white/[0.03]
                    dark:text-gray-400
                  "
                >
                  <span>Ctrl</span>
                  <span>K</span>
                </span>
              </div>
            </form>
          </div>

          {/* ============================= */}
          {/* الجهة اليسرى - أدوات النظام */}
          {/* ============================= */}

          <div className="flex items-center gap-2">
            {/* زر أدوات الهاتف */}
            <button
              type="button"
              onClick={toggleApplicationMenu}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-lg
                text-gray-700
                hover:bg-gray-100
                dark:text-gray-400
                dark:hover:bg-gray-800
                lg:hidden
              "
              aria-label="فتح أدوات النظام"
              aria-expanded={isApplicationMenuOpen}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="5"
                  cy="12"
                  r="1.5"
                  fill="currentColor"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="1.5"
                  fill="currentColor"
                />
                <circle
                  cx="19"
                  cy="12"
                  r="1.5"
                  fill="currentColor"
                />
              </svg>
            </button>

            {/* الأدوات - Desktop */}
            <div className="hidden items-center gap-2 lg:flex">
              <ThemeToggleButton />
              <NotificationDropdown />
              <UserDropdown />
            </div>
          </div>
        </div>

        {/* ============================= */}
        {/* أدوات الهاتف */}
        {/* ============================= */}

        {isApplicationMenuOpen && (
          <div
            className="
              flex
              w-full
              items-center
              justify-center
              border-b
              border-gray-200
              bg-white
              px-5
              py-4
              shadow-theme-md
              dark:border-gray-800
              dark:bg-gray-900
              lg:hidden
            "
          >
            <div className="flex items-center gap-3">
              <ThemeToggleButton />
              <NotificationDropdown />
              <UserDropdown />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;