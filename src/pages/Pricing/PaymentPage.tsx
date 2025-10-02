// src/pages/PaymentPage.tsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { addDoc, collection, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { AuthContext } from "../../contexts/AuthContext";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { currentUser, refreshUserProfile } = useContext(AuthContext)!;
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardOwner, setCardOwner] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    if (!cardNumber || !expiry || !cvv || !cardOwner) {
      setError("⚠️ Please fill in all fields");
      return false;
    }
    if (cardNumber.length < 16) {
      setError("⚠️ Invalid card number");
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      setError("⚠️ Expiry must be in MM/YY format");
      return false;
    }
    if (cvv.length < 3) {
      setError("⚠️ Invalid CVV");
      return false;
    }
    setError("");
    return true;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulate payment success
    setSuccess(true);

    // Save payment to Firestore
    try {
      const courseId = localStorage.getItem("selectedCourseId");
      await addDoc(collection(db, "payments"), {
        userId: currentUser?.uid || "anonymous",
        cardOwner,
        cardNumberLast4: cardNumber.slice(-4),
        expiry,
        courseId,
        timestamp: new Date()
      });

      // Update user's purchased courses
      if (currentUser?.uid && courseId) {
        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, {
          purchasedCourses: arrayUnion(courseId)
        });
        // Refresh user profile to update the UI
        await refreshUserProfile();
      }
    } catch (error) {
      console.error("Error saving payment:", error);
    }

    setTimeout(() => {
      const courseId = localStorage.getItem("selectedCourseId");
      if (courseId) {
        navigate(`/learn/${courseId}`); // Redirect to CourseDetailsPage
        localStorage.removeItem("selectedCourseId");
      } else {
        navigate("/dashboard"); // fallback
      }
    }, 2000); // delay to show success popup
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center py-16">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Payment <span className="text-lime-500">Checkout</span>
        </h2>

        <form onSubmit={handlePayment} className="space-y-4">
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Card Owner Name"
            value={cardOwner}
            onChange={(e) => setCardOwner(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-lime-500 text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-lime-400 transition"
          >
            Pay Now
          </button>
        </form>

        {success && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg animate-fadeIn">
            ✅ Payment Completed Successfully
          </div>
        )}
      </div>
    </section>
  );
}
