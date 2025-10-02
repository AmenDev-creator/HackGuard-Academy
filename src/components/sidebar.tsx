// src/components/Sidebar.tsx
import { Link, useNavigate } from "react-router";
import { X, Home, BookOpen, DollarSign, Info, Phone, User, LogOut, ChevronDown, ChevronRight, Shell } from "lucide-react";
import { useAuth } from "../contexts/useAuth";
import { useState } from "react";
import HackGuardLogo from "../assets/HackGuardlogo.png";
import defaultAvatar from "../assets/tablogo.png";

interface SidebarProps {
  onClose: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const { currentUser, userProfile, logout } = useAuth();
  const [showCourses, setShowCourses] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
      navigate("/"); 
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="relative z-50 w-64 h-full bg-gray-900 text-white shadow-xl">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        <X size={24} />
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2 p-6 border-b border-gray-700">
        <img src={HackGuardLogo} alt="HackGuard Logo" className="h-10 w-auto" />
      </div>

      {/* Navigation */}
      <div className="flex flex-col h-full p-6 space-y-4">
        <Link to="/" onClick={onClose} className="flex items-center gap-2 px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors">
          <Home size={18} /> Home
        </Link>

        {/* Courses Dropdown */}
        <div>
          <button
            onClick={() => setShowCourses(!showCourses)}
            className="flex items-center justify-between w-full px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <span className="flex items-center gap-2">
              <BookOpen size={18} /> Courses
            </span>
            {showCourses ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          {showCourses && (
            <div className="ml-6 mt-2 space-y-2 text-sm">
              <Link to="/learn" onClick={onClose} className="block px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors">
                All Courses
              </Link>
              <Link to="/learn?filter=Free" onClick={onClose} className="block px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors">
                Free Courses
              </Link>
              <Link to="/learn?filter=Premium" onClick={onClose} className="block px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors">
                Premium Courses
              </Link>
            </div>
          )}
        </div>

        <Link to="/pricing" onClick={onClose} className="flex items-center gap-2 px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors">
          <DollarSign size={18} /> Pricing
        </Link>
        <Link to="/about" onClick={onClose} className="flex items-center gap-2 px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors">
          <Info size={18} /> About
        </Link>
        <Link to="/contact" onClick={onClose} className="flex items-center gap-2 px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors">
          <Phone size={18} /> Contact
        </Link>

        {/* User Section */}
        <div className="mt-8 border-t border-gray-700 pt-4">
          {currentUser ? (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={currentUser.photoURL || defaultAvatar}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-lime-400"
                />
                <div>
                  <p className="text-sm font-medium">
                    {userProfile?.fullName || currentUser.email}
                  </p>
                  <p className="text-xs text-gray-400">{currentUser.email}</p>
                </div>
              </div>

              <Link
                to="/dashboard"
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <Home size={16} /> Dashboard
              </Link>
              <Link
                to="/profile"
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <User size={16} /> Profile
              </Link>
              <Link
                to="/lab"
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <Shell size={16} /> Lab
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded bg-gray-800 text-red-400 hover:bg-gray-700 transition-colors w-full text-left"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                to="/signin"
                onClick={onClose}
                className="text-lime-400 border border-lime-400 px-4 py-2 rounded-lg text-center hover:bg-lime-400 hover:text-gray-900"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                onClick={onClose}
                className="bg-lime-400 text-gray-900 px-4 py-2 rounded-lg text-center font-semibold hover:bg-lime-300"
              >
                Join for FREE
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
