// src/components/Navbar.tsx
import { Link } from "react-router";
import HackGuardLogo from "../assets/HackGuardlogo.png";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
     
      <div className="flex items-center space-x-2">
        <img
          src={HackGuardLogo}
          alt="HackGuard Logo"
          className="h-10 w-auto"
        />
      </div>

      {/* Links */}
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="hover:text-lime-400 transition">
          Home
        </Link>
        <Link to="/learn" className="hover:text-lime-400 transition">
          Learn
        </Link>
        <Link to="/practice" className="hover:text-lime-400 transition">
          Practice
        </Link>
        <Link to="/pricing" className="hover:text-lime-400 transition">
          Pricing
        </Link>
        <Link to="/about" className="hover:text-lime-400 transition">
          About
        </Link>
        <Link to="/contact" className="hover:text-lime-400 transition">
          Contact
        </Link>
      </div>

     
      <div className="flex space-x-4">
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
      </div>
    </nav>
  );
}
