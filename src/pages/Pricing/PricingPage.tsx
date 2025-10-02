// src/pages/PricingPage.tsx
import { useAuth } from "../../contexts/useAuth";
import { useNavigate } from "react-router";

export default function PricingPage() {
  const { currentUser, setReturnUrl } = useAuth();
  const navigate = useNavigate();

  const handleProClick = () => {
    if (!currentUser) {
      setReturnUrl("/payment");
      navigate("/signin");
    } else {
      navigate("/payment");
    }
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 text-center">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-12">
          Choose Your <span className="text-lime-500">Plan</span>
        </h1>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Free Plan</h2>
            <p className="text-gray-600 mb-6">
              Access beginner courses and community resources.
            </p>
            <ul className="text-gray-700 text-left mb-6 space-y-2">
              <li>✔ Access to Free Courses</li>
              <li>✔ Community Forum</li>
              <li>✖ Premium Labs</li>
              <li>✖ Certification</li>
            </ul>
            <p className="text-3xl font-bold mb-6">Free</p>
            <button
              onClick={() => navigate("/learn")}
              className="w-full bg-lime-500 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-lime-400 transition"
            >
              Start Learning
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl shadow-lg p-8 flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Pro Plan</h2>
            <p className="text-gray-200 mb-6">
              Unlock premium courses, hands-on labs, and certifications.
            </p>
            <ul className="text-left mb-6 space-y-2">
              <li>✔ All Free Plan Features</li>
              <li>✔ Two Premium Courses</li>
              <li>✔ Hands-on Labs</li>
              <li>✔ Certificates</li>
            </ul>
            <p className="text-3xl font-bold mb-6">$99/month</p>
            <button
              onClick={handleProClick}
              className="w-full bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Go Premium
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
