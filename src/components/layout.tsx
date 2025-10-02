// src/components/Layout.tsx
import  { useState } from "react";
import type { ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import Sidebar from "./sidebar"; // إذا عندك Sidebar
import { useLocation } from "react-router";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 🟢 Navbar */}
      <Navbar onToggleSidebar={toggleSidebar} />

      {/* 🟢 Sidebar (mobile) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={toggleSidebar}
          />
          <Sidebar onClose={toggleSidebar} />
        </div>
      )}

      {/* 🟢 Main Content */}
      <main className="flex-grow">{children}</main>

      {/* 🟢 Footer */}
      {location.pathname !== "/payment" && <Footer />}
    </div>
  );
}
