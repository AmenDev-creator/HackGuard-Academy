import { Link } from "react-router";
import { useState, useEffect } from "react";

const courses = [
  {
    id: 1,
    title: "Introduction to Cyber Security",
    description: "Learn the basics of cyber security and ethical hacking.",
    image: "/course1.png",
  },
  {
    id: 2,
    title: "Web Application Security",
    description: "Understand how web apps are hacked and how to secure them.",
    image: "/course2.png",
  },
  {
    id: 3,
    title: "Network Penetration Testing",
    description: "Hands-on labs to master network security testing.",
    image: "/course3.png",
  },
  {
    id: 4,
    title: "Malware Analysis",
    description: "Discover how to analyze and detect malware effectively.",
    image: "/course4.png",
  },
  {
    id: 5,
    title: "Cloud Security Fundamentals",
    description: "Secure cloud environments with best practices.",
    image: "/course5.png",
  },
  {
    id: 6,
    title: "Advanced Ethical Hacking",
    description: "Deep dive into professional penetration testing techniques.",
    image: "/course6.png",
  },
];

export default function LearnPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
            All <span className="text-lime-500">Courses</span>
          </h1>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow p-6 flex flex-col animate-pulse"
              >
                <div className="bg-gray-300 rounded-xl w-full h-40 mb-4"></div>
                <div className="bg-gray-300 h-6 mb-2 rounded"></div>
                <div className="bg-gray-300 h-4 mb-1 rounded"></div>
                <div className="bg-gray-300 h-4 mb-4 rounded w-3/4"></div>
                <div className="bg-lime-300 h-10 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
          All <span className="text-lime-500">Courses</span>
        </h1>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col"
            >
              <img
                src={course.image}
                alt={course.title}
                className="rounded-xl w-full h-40 object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600 flex-grow">{course.description}</p>
              <Link
                to={`/learn/${course.id}`}
                className="mt-4 inline-block bg-lime-500 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-lime-400 transition text-center"
              >
                Enroll
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
