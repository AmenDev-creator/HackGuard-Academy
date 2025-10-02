import { useState } from "react";
import { useFormik } from "formik";
import {useNavigate, Link} from "react-router"
import * as Yup from "yup";
import { auth, db, googleProvider } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";



export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Define validation schema
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required("Full name is required")
      .min(2, "Name must be at least 2 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const userCred = await createUserWithEmailAndPassword(auth, values.email, values.password);
        
        // Create user document in Firestore with additional profile data
        await setDoc(doc(db, "users", userCred.user.uid), {
          uid: userCred.user.uid,
          fullName: values.fullName,
          email: values.email,
          createdAt: serverTimestamp(),
          lastSignin: serverTimestamp(),
          role: "student", // Default role
          profileComplete: false,
          accountStatus: "active"
        });
        
        // Create audit log entry for signup
        await setDoc(doc(db, "audit_logs", `signup_${userCred.user.uid}_${Date.now()}`), {
          userId: userCred.user.uid,
          action: "account_created",
          method: "email",
          timestamp: serverTimestamp(),
          userAgent: navigator.userAgent
        });
        
        alert("Signup successful ✅");
        localStorage.setItem('justSignedUp', 'true');
        navigate("/dashboard");
       
      } catch (err) {
        console.error(err);
        const error = err as any;
        // Handle specific Firebase auth errors
        if (error.code === "auth/email-already-in-use") {
          formik.setErrors({ email: "Email is already in use" });
        } else if (error.code === "auth/invalid-email") {
          formik.setErrors({ email: "Invalid email format" });
        } else if (error.code === "auth/weak-password") {
          formik.setErrors({ password: "Password is too weak" });
        } else {
          formik.setErrors({ email: `Error creating account: ${error.message || "Unknown error"}` });
        }
      } finally {
        setLoading(false);
      }
    }
  });

  // Google Signup Handler
  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      const userCred = await signInWithPopup(auth, googleProvider);
      const user = userCred.user;
      
      // Use setDoc with merge to create or update the user document
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          fullName: user.displayName || "Google User",
          email: user.email,
          createdAt: serverTimestamp(),
          lastSignin: serverTimestamp(),
          role: "student",
          profileComplete: false,
          accountStatus: "active",
          authProvider: "google"
        },
        { merge: true }
      );
      
      // Create audit log entry for Google signup
      await setDoc(doc(db, "audit_logs", `google_signup_${user.uid}_${Date.now()}`), {
        userId: user.uid,
        action: "account_created",
        method: "google",
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent
      });
      
      alert("Google Signup successful ✅");
      localStorage.setItem('justSignedUp', 'true');
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      const error = err as any;
      formik.setErrors({ email: `Error with Google signup: ${error.message || "Unknown error"}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-6 max-w-md w-full rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Create Account</h2>
        
        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border ${formik.touched.fullName && formik.errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full focus:outline-none focus:border-lime-500`}
              disabled={loading}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.fullName}</div>
            )}
          </div>
          
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full focus:outline-none focus:border-lime-500`}
              disabled={loading}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>
          
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full focus:outline-none focus:border-lime-500`}
              disabled={loading}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>
          
          <button 
            type="submit"
            className="bg-lime-500 text-gray-900 px-4 py-2 rounded w-full hover:bg-lime-400 transition cursor-pointer disabled:opacity-50"
            disabled={loading || formik.isSubmitting}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        
        <div className="my-4 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        
        <button
          onClick={handleGoogleSignup}
          className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded w-full hover:bg-gray-100 transition cursor-pointer disabled:opacity-50"
          disabled={loading}
        >
          <FcGoogle size={20} /> {loading ? "Processing..." : "Sign Up with Google"}
        </button>
        <p className="text-center mt-4">Have an account? <Link to="/signin" className="text-lime-500 hover:underline">Login</Link></p>
      </div>
    </div>
  );
}