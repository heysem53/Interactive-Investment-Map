import { useEffect, useRef, useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Link } from "react-router";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [position, setPosition] = useState({
    top: 0,
    right: 0,
  });

  function updatePosition() {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    const dropdownWidth = window.innerWidth < 640 ? 350 : 361;

    let right = window.innerWidth - rect.right;

    // منع خروج القائمة من الشاشة من اليمين
    right = Math.max(12, right);

    // منع خروج القائمة من الشاشة من اليسار
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
    setNotifying(false);
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
      {/* زر الإشعارات */}
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleDropdown}
        className="
          dropdown-toggle
          relative
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-gray-200
          bg-white
          text-gray-500
          transition-colors
          hover:bg-gray-100
          hover:text-gray-700
          dark:border-gray-800
          dark:bg-gray-900
          dark:text-gray-400
          dark:hover:bg-gray-800
          dark:hover:text-white
        "
        aria-label="الإشعارات"
        aria-expanded={isOpen}
      >
        {/* مؤشر الإشعار الجديد */}
        {notifying && (
          <span className="absolute right-0 top-0.5 z-10 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400" />
          </span>
        )}

        {/* أيقونة الجرس */}
        <svg
          className="fill-current"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H4.37504H15.625H16.6667C17.0809 15.9591 17.4167 15.6234 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875ZM8.00004 17.7085C8.00004 18.1228 8.33583 18.4585 8.75004 18.4585H11.25C11.6643 18.4585 12 18.1228 12 17.7085C12 17.2943 11.6643 16.9585 11.25 16.9585H8.75004C8.33583 16.9585 8.00004 17.2943 8.00004 17.7085Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* قائمة الإشعارات */}
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        style={{
          top: `${position.top}px`,
          right: `${position.right}px`,
        }}
        className="
          flex
          h-[480px]
          w-[350px]
          max-w-[calc(100vw-24px)]
          flex-col
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-3
          shadow-theme-lg
          dark:border-gray-800
          dark:bg-gray-dark
          sm:w-[361px]
        "
      >
        {/* رأس القائمة */}
        <div
          dir="rtl"
          className="
            mb-3
            flex
            items-center
            justify-between
            border-b
            border-gray-100
            pb-3
            dark:border-gray-700
          "
        >
          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            الإشعارات
          </h5>

          <button
            type="button"
            onClick={closeDropdown}
            className="
              text-gray-500
              transition
              hover:text-gray-700
              dark:text-gray-400
              dark:hover:text-gray-200
            "
            aria-label="إغلاق الإشعارات"
          >
            ×
          </button>
        </div>

        {/* قائمة الإشعارات */}
        <ul
          dir="rtl"
          className="
            custom-scrollbar
            flex
            flex-1
            flex-col
            overflow-y-auto
            overflow-x-hidden
          "
        >
          <NotificationItem
            image="/images/user/user-02.jpg"
            name="Terry Franci"
            message="طلب صلاحية لتعديل مشروع"
            project="Nganter App"
            time="منذ 5 دقائق"
            status="success"
            onClick={closeDropdown}
          />

          <NotificationItem
            image="/images/user/user-03.jpg"
            name="Alena Franci"
            message="طلب صلاحية لتعديل مشروع"
            project="Nganter App"
            time="منذ 8 دقائق"
            status="success"
            onClick={closeDropdown}
          />

          <NotificationItem
            image="/images/user/user-04.jpg"
            name="Jocelyn Kenter"
            message="طلب صلاحية لتعديل مشروع"
            project="Nganter App"
            time="منذ 15 دقيقة"
            status="success"
            onClick={closeDropdown}
          />

          <NotificationItem
            image="/images/user/user-05.jpg"
            name="Brandon Philips"
            message="طلب صلاحية لتعديل مشروع"
            project="Nganter App"
            time="منذ ساعة"
            status="error"
            onClick={closeDropdown}
          />

          <NotificationItem
            image="/images/user/user-02.jpg"
            name="Terry Franci"
            message="تم تحديث بيانات المشروع"
            project="Nganter App"
            time="منذ ساعتين"
            status="success"
            onClick={closeDropdown}
          />

          <NotificationItem
            image="/images/user/user-03.jpg"
            name="Alena Franci"
            message="تمت إضافة ملاحظة جديدة"
            project="Nganter App"
            time="منذ 3 ساعات"
            status="success"
            onClick={closeDropdown}
          />
        </ul>

        {/* أسفل القائمة */}
        <Link
          to="/notifications"
          onClick={closeDropdown}
          className="
            mt-3
            block
            rounded-lg
            border
            border-gray-300
            bg-white
            px-4
            py-2
            text-center
            text-sm
            font-medium
            text-gray-700
            hover:bg-gray-100
            dark:border-gray-700
            dark:bg-gray-800
            dark:text-gray-400
            dark:hover:bg-gray-700
          "
        >
          عرض جميع الإشعارات
        </Link>
      </Dropdown>
    </div>
  );
}

function NotificationItem({
  image,
  name,
  message,
  project,
  time,
  status,
  onClick,
}: {
  image: string;
  name: string;
  message: string;
  project: string;
  time: string;
  status: "success" | "error";
  onClick: () => void;
}) {
  return (
    <li>
      <DropdownItem
        onItemClick={onClick}
        className="
          flex
          w-full
          min-w-0
          items-start
          gap-3
          rounded-lg
          border-b
          border-gray-100
          px-4
          py-3
          text-right
          hover:bg-gray-100
          dark:border-gray-800
          dark:hover:bg-white/5
        "
      >
        {/* صورة المستخدم */}
        <span className="relative block h-10 w-10 shrink-0 rounded-full">
          <img
            width={40}
            height={40}
            src={image}
            alt={name}
            className="h-10 w-10 rounded-full object-cover"
          />

          <span
            className={`
              absolute
              bottom-0
              right-0
              z-10
              h-2.5
              w-2.5
              rounded-full
              border-[1.5px]
              border-white
              ${
                status === "success"
                  ? "bg-success-500"
                  : "bg-error-500"
              }
              dark:border-gray-900
            `}
          />
        </span>

        {/* محتوى الإشعار */}
        <span className="block min-w-0 flex-1">
          <span className="mb-1.5 block break-words text-theme-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-800 dark:text-white/90">
              {name}
            </span>{" "}
            <span>{message}</span>{" "}
            <span className="font-medium text-gray-800 dark:text-white/90">
              {project}
            </span>
          </span>

          <span className="flex items-center gap-2 text-theme-xs text-gray-500 dark:text-gray-400">
            <span>مشروع</span>

            <span className="h-1 w-1 shrink-0 rounded-full bg-gray-400" />

            <span>{time}</span>
          </span>
        </span>
      </DropdownItem>
    </li>
  );
}