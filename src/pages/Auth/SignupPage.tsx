import { useState } from "react";
import { auth, db, googleProvider as provider } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc"; 

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCred.user.uid), {
        uid: userCred.user.uid,
        fullName,
        email,
        createdAt: serverTimestamp(),
      });
      alert("Signup successful ✅");
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const userCred = await signInWithPopup(auth, provider);
      await setDoc(doc(db, "users", userCred.user.uid), {
        uid: userCred.user.uid,
        fullName: userCred.user.displayName,
        email: userCred.user.email,
        createdAt: serverTimestamp(),
      });
      alert("Google Signup successful ✅");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
      <form onSubmit={handleSignup} className="space-y-3">
        <input type="text" placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} className="border rounded px-3 py-2 w-full"/>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="border rounded px-3 py-2 w-full"/>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="border rounded px-3 py-2 w-full"/>
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 cursor-pointer">
          Sign Up
        </button>
      </form>
      <button 
        onClick={handleGoogleSignup} 
        className="flex items-center justify-center gap-2 border mt-4 px-4 py-2 rounded w-full hover:bg-gray-100 cursor-pointer"
      >
        <FcGoogle size={20}/> Sign Up with Google
      </button>
    </div>
  );
}
