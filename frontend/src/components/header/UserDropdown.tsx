import { useEffect, useRef, useState } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { Link } from "react-router";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [position, setPosition] = useState({
    top: 0,
    right: 0,
  });

  function updatePosition() {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    const dropdownWidth = 260;

    let right = window.innerWidth - rect.right;

    right = Math.max(12, right);

    if (right + dropdownWidth > window.innerWidth - 12) {
      right = window.innerWidth - dropdownWidth - 12;
    }

    setPosition({
      top: rect.bottom + 10,
      right,
    });
  }

  function toggleDropdown() {
    if (!isOpen) {
      updatePosition();
    }

    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    updatePosition();

    const handleResize = () => {
      updatePosition();
    };

    const handleScroll = () => {
      updatePosition();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen]);

  return (
    <div className="relative overflow-visible">
      {/* زر المستخدم */}
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleDropdown}
        className="
          dropdown-toggle
          flex
          items-center
          text-gray-700
          dark:text-gray-400
        "
        aria-expanded={isOpen}
      >
        <span className="mr-3 h-11 w-11 overflow-hidden rounded-full">
          <img
            src="/images/user/heysem.jpeg"
            alt="المستخدم"
            className="h-full w-full object-cover"
          />
        </span>

        <span className="mr-1 block font-medium text-theme-sm">
          المستخدم
        </span>

        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* قائمة المستخدم */}
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        style={{
          top: `${position.top}px`,
          right: `${position.right}px`,
        }}
        className="
          flex
          w-[260px]
          flex-col
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-3
          shadow-theme-lg
          dark:border-gray-800
          dark:bg-gray-dark
        "
      >
        {/* معلومات المستخدم */}
        <div
          dir="rtl"
          className="border-b border-gray-200 pb-3 text-right dark:border-gray-800"
        >
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            المستخدم
          </span>

          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            admin@investment-map.com
          </span>
        </div>

        {/* خيارات الحساب */}
        <ul
          dir="rtl"
          className="
            flex
            flex-col
            gap-1
            border-b
            border-gray-200
            pb-3
            pt-4
            dark:border-gray-800
          "
        >
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/profile"
              className="
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-2
                text-right
                font-medium
                text-gray-700
                text-theme-sm
                hover:bg-gray-100
                hover:text-gray-700
                dark:text-gray-400
                dark:hover:bg-white/5
                dark:hover:text-gray-300
              "
            >
              <span>👤</span>
              <span>الملف الشخصي</span>
            </DropdownItem>
          </li>

          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/settings"
              className="
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-2
                text-right
                font-medium
                text-gray-700
                text-theme-sm
                hover:bg-gray-100
                hover:text-gray-700
                dark:text-gray-400
                dark:hover:bg-white/5
                dark:hover:text-gray-300
              "
            >
              <span>⚙️</span>
              <span>إعدادات الحساب</span>
            </DropdownItem>
          </li>

          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/support"
              className="
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-2
                text-right
                font-medium
                text-gray-700
                text-theme-sm
                hover:bg-gray-100
                hover:text-gray-700
                dark:text-gray-400
                dark:hover:bg-white/5
                dark:hover:text-gray-300
              "
            >
              <span>❓</span>
              <span>الدعم</span>
            </DropdownItem>
          </li>
        </ul>

        {/* تسجيل الخروج */}
        <Link
          to="/signin"
          onClick={closeDropdown}
          dir="rtl"
          className="
            mt-3
            flex
            items-center
            gap-3
            rounded-lg
            px-3
            py-2
            text-right
            font-medium
            text-gray-700
            text-theme-sm
            hover:bg-gray-100
            hover:text-gray-700
            dark:text-gray-400
            dark:hover:bg-white/5
            dark:hover:text-gray-300
          "
        >
          <span>↪</span>
          <span>تسجيل الخروج</span>
        </Link>
      </Dropdown>
    </div>
  );
}