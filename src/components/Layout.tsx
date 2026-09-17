import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileNav from "./MobileNav";
import Sidebar from "./Sidebar";
import AuthModal from "./ui/AuthModal";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#243e62] text-gray-100 font-sans">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-grow pb-16">
        <Outlet />
      </main>
      
      <Footer />
      <MobileNav />
      <AuthModal />
    </div>
  );
}
