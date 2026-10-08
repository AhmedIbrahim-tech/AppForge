import { Outlet } from "react-router-dom";
import { Navbar } from "@/shared/components/layout/Navbar";
import { Footer } from "@/shared/components/layout/Footer";

export function WebsiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-base text-text-primary transition-colors duration-200">
      <Navbar />
      <main className="flex-1 w-full pb-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
