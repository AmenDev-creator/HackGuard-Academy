// src/pages/About/AboutPage.tsx
export default function AboutPage() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          About <span className="text-lime-500">HackGuard Academy</span>
        </h1>
        <p className="text-gray-700 max-w-3xl mx-auto mb-8">
          CyberAcademy is a modern platform that provides both free and paid
          cybersecurity courses. Our mission is to make cybersecurity education
          accessible to everyone. With hands-on labs, expert instructors, and
          real-world projects, we prepare our students for the challenges of the
          digital world.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-gray-50 p-8 rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              🎓 Expert Instructors
            </h3>
            <p className="text-gray-600">
              Learn from professionals with years of real-world experience.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              🌍 Global Community
            </h3>
            <p className="text-gray-600">
              Join a growing network of students and professionals worldwide.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              💡 Hands-On Learning
            </h3>
            <p className="text-gray-600">
              Practice with real-world labs and interactive exercises.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
