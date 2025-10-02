import { Link } from "react-router";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/useAuth";
import { Menu, User, LogOut, Home, Shell } from "lucide-react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import defaultAvatar from "../assets/avatar.jpg";
import HackGuardLogo from "../assets/HackGuardlogo.png";

export default function Navbar({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { currentUser, userProfile, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setShowDropdown(false);
      toast.success("Logged out successfully ✅");
      navigate("/"); 
    } catch (error) {
      console.error("Failed to log out", error);
      toast.error("Logout failed ❌");
    }
  };

  return (
    <nav className="bg-gray-900 shadow-sm py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img
            src={HackGuardLogo}
            alt="HackGuard Logo"
            className="h-10 w-auto"
          />
        </Link>
      </div>

      {/* Hamburger for mobile */}
      <button
        className="md:hidden text-white"
        onClick={onToggleSidebar}
      >
        <Menu size={24} />
      </button>

      {/* Links */}
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="text-white hover:text-lime-400 transition">
          Home
        </Link>
        <Link to="/learn" className="text-white hover:text-lime-400 transition">
          Courses
        </Link>
        <Link to="/pricing" className="text-white hover:text-lime-400 transition">
          Pricing
        </Link>
        <Link to="/about" className="text-white hover:text-lime-400 transition">
          About
        </Link>
        <Link to="/contact" className="text-white hover:text-lime-400 transition">
          Contact
        </Link>
      </div>

      {/* User Section */}
      <div className="hidden md:flex space-x-4">
        {currentUser ? (
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center focus:outline-none"
            >
              <img 
                src={currentUser.photoURL || defaultAvatar} 
                alt="User Avatar" 
                className="w-10 h-10 rounded-full border-2 border-lime-400 hover:border-lime-500 transition-all"
              />
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10 animate-fadeIn">
                <div className="px-4 py-2 border-b border-gray-600">
                  <p className="text-sm font-medium text-white">
                    {userProfile?.fullName || currentUser.email}
                  </p>
                  <p className="text-xs text-gray-300 truncate">
                    {currentUser.email}
                  </p>
                </div>

                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center"
                  onClick={() => setShowDropdown(false)}
                >
                  <Home size={16} className="mr-2" /> Dashboard
                </Link>

                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center"
                  onClick={() => setShowDropdown(false)}
                >
                  <User size={16} className="mr-2" /> Profile
                </Link>

                <Link
                  to="/lab"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center"
                  onClick={() => setShowDropdown(false)}
                >
                  <Shell size={16} className="mr-2" /> Lab
                </Link>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center"
                >
                  <LogOut size={16} className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              to="/signin"
              className="border border-lime-400 text-lime-400 px-4 py-2 rounded-lg hover:bg-lime-400 hover:text-gray-900 transition"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="bg-lime-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-lime-300 transition"
            >
              Join for FREE
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
