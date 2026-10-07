import { Outlet } from "react-router-dom";
import { Navbar } from "@/shared/components/layout/Navbar";
import { Footer } from "@/shared/components/layout/Footer";

export function WebsiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0B0E11] text-[#F2F4F5] selection:bg-[#E56B3F]/25 selection:text-[#F2F4F5]">
      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

