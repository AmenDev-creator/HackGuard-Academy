// src/pages/Auth/SigninPage.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebaseConfig";
import { FcGoogle } from "react-icons/fc";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // 🔑 Redirection logic
      const courseId = localStorage.getItem("redirectCourseId");
      if (courseId) {
        localStorage.removeItem("redirectCourseId");
        navigate(`/learn/${courseId}`);
      } else if (localStorage.getItem("redirectAfterLogin") === "pricing") {
        localStorage.removeItem("redirectAfterLogin");
        navigate("/pricing");
      } else {
        navigate("/dashboard");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);

      const courseId = localStorage.getItem("redirectCourseId");
      if (courseId) {
        localStorage.removeItem("redirectCourseId");
        navigate(`/learn/${courseId}`);
      } else if (localStorage.getItem("redirectAfterLogin") === "pricing") {
        localStorage.removeItem("redirectAfterLogin");
        navigate("/pricing");
      } else {
        navigate("/dashboard");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-6 max-w-md w-full rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Sign In</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSignin} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-lime-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-lime-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-lime-500 text-gray-900 px-4 py-2 rounded w-full hover:bg-lime-400 transition cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <div className="my-4 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleSignin}
          className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded w-full hover:bg-gray-100 transition cursor-pointer"
        >
          <FcGoogle size={20} /> Sign in with Google
        </button>
        <p className="text-center mt-4">Don't have an account? <Link to="/signup" className="text-lime-500 hover:underline">Sign Up</Link></p>
      </div>
    </div>
  );
}
