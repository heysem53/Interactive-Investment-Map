import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex" dir="rtl">
      <AppSidebar />

      <Backdrop />

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered
            ? "lg:mr-[290px]"
            : "lg:mr-[90px]"
        } ${isMobileOpen ? "mr-0" : ""}`}
      >
        <AppHeader />

        <main className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;