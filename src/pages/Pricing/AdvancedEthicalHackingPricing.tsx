import { useAuth } from "../../contexts/useAuth";
import { useNavigate } from "react-router";

export default function AdvancedEthicalHackingPricing() {
  const { currentUser, setReturnUrl } = useAuth();
  const navigate = useNavigate();

  const handlePurchase = () => {
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
          Premium Course: <span className="text-purple-600">Advanced Ethical Hacking</span>
        </h1>

        {/* Course Card */}
        <div className="max-w-md mx-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl shadow-lg p-8 flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Advanced Ethical Hacking</h2>
          <p className="text-gray-200 mb-6">
            Explore sophisticated attack vectors and evasion techniques.
          </p>
          <ul className="text-left mb-6 space-y-2">
            <li>✔ Advanced Evasion Techniques</li>
            <li>✔ Exploit Development & Shellcode</li>
            <li>✔ Red Teaming Methodology</li>
            <li>✔ Social Engineering Tactics</li>
            <li>✔ Certificate upon Completion</li>
            <li>✔ Lifetime Access</li>
          </ul>
          <p className="text-3xl font-bold mb-6">$49</p>
          <button
            onClick={handlePurchase}
            className="w-full bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Purchase Course
          </button>
        </div>
      </div>
    </section>
  );
}