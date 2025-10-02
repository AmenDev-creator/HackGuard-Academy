// src/pages/ProfilePage.tsx
import { useState } from "react";
import { useAuth } from "../../contexts/useAuth";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import defaultAvatar from "../../assets/avatar.jpg";

export default function ProfilePage() {
  const { currentUser, userProfile } = useAuth();
  const [fullName, setFullName] = useState(currentUser?.displayName || "");
  const [photoURL, setPhotoURL] = useState(userProfile?.authProvider === "google" ? currentUser?.photoURL || "" : defaultAvatar);
  const [message, setMessage] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      await updateProfile(auth.currentUser!, {
        displayName: fullName,
        photoURL,
      });

      setMessage("✅ Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update profile.");
    }
  };

  if (!currentUser) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Please sign in to view your profile
        </h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        My <span className="text-lime-500">Profile</span>
      </h1>

      <div className="bg-white shadow rounded-2xl p-8 max-w-xl mx-auto">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={photoURL || defaultAvatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-lime-400 mb-3"
          />
          <p className="text-gray-700 font-medium">
            {currentUser.email}
          </p>
        </div>

        {/* Update Form */}
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Profile Picture URL</label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Paste image URL"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-lime-500 text-gray-900 py-2 rounded-lg font-semibold hover:bg-lime-400 transition"
          >
            Update Profile
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center font-medium text-blue-600">{message}</p>
        )}
      </div>
    </div>
  );
}
