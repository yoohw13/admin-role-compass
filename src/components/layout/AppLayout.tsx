
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export function AppLayout() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("Dashboard");
  
  // Update page title based on current route
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setPageTitle("Dashboard");
        break;
      case "/users":
        setPageTitle("User Management");
        break;
      case "/settings":
        setPageTitle("Settings");
        break;
      default:
        if (location.pathname.startsWith("/users/")) {
          setPageTitle("User Details");
        } else {
          setPageTitle("Admin Role Manager");
        }
    }
  }, [location.pathname]);
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <AppHeader title={pageTitle} />
          <main className="flex-1 p-6 overflow-auto bg-gray-50">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
