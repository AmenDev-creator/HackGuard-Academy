import { useState } from "react";
import { auth, googleProvider as provider } from "../../firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Signin successful ✅");
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Google Signin successful ✅");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleSignin} className="space-y-3">
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full"/>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full"/>
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Sign In</button>
      </form>
      <button onClick={handleGoogleSignin} className="bg-red-500 text-white mt-4 px-4 py-2 rounded w-full">
        Sign In with Google
      </button>
    </div>
  );
}
