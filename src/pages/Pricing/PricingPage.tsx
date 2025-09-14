// src/pages/Pricing/PricingPage.tsx
export default function PricingPage() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">
          Choose Your <span className="text-lime-500">Plan</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-gray-50 p-10 rounded-2xl shadow hover:shadow-lg transition flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Free Plan</h2>
            <p className="text-gray-600 mb-6">
              Start learning cybersecurity with free resources and community support.
            </p>
            <ul className="text-gray-700 text-left mb-6 space-y-2">
              <li>✔ Access to beginner courses</li>
              <li>✔ Community forum</li>
              <li>✔ Free tutorials & articles</li>
              <li>✖ No certificates</li>
              <li>✖ Limited tools access</li>
            </ul>
            <span className="text-3xl font-bold mb-6">$0</span>
            <button className="bg-lime-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-lime-400 transition mt-auto">
              Get Started
            </button>
          </div>

          {/* Paid Plan */}
          <div className="bg-gray-900 text-white p-10 rounded-2xl shadow-lg border-2 border-lime-500 flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Pro Plan</h2>
            <p className="text-gray-300 mb-6">
              Unlock full access to advanced courses, labs, and certifications.
            </p>
            <ul className="text-gray-200 text-left mb-6 space-y-2">
              <li>✔ All beginner + advanced courses</li>
              <li>✔ Hands-on labs with Kali Linux tools</li>
              <li>✔ Downloadable resources</li>
              <li>✔ Certificates of completion</li>
              <li>✔ Priority support</li>
            </ul>
            <span className="text-3xl font-bold mb-6">$49 / month</span>
            <button className="bg-lime-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-lime-400 transition mt-auto">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
