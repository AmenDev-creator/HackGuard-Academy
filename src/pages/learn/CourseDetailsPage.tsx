// src/pages/Learn/CourseDetailsPage.tsx
import { useParams, Link } from "react-router";

const courses = [
  {
    id: 1,
    title: "Introduction to Cyber Security",
    description:
      "Learn the basics of cyber security, ethical hacking, and digital safety. This course covers security principles, threat types, and defense strategies.",
    image: "/course1.png",
    lessons: 12,
    duration: "8 hours",
    level: "Beginner",
    tools: [
      { name: "Wireshark", img: "/tools/wireshark.png" },
      { name: "Nmap", img: "/tools/nmap.png" },
    ],
    attacks: ["Phishing basics", "Password Cracking intro", "Network sniffing"],
  },
  {
    id: 2,
    title: "Web Application Security",
    description:
      "Understand how web applications are hacked and how to secure them. Includes SQLi, XSS, CSRF, and secure coding practices.",
    image: "/course2.png",
    lessons: 18,
    duration: "12 hours",
    level: "Intermediate",
    tools: [
      { name: "Burp Suite", img: "/tools/burpsuite.png" },
      { name: "OWASP ZAP", img: "/tools/zap.png" },
    ],
    attacks: ["SQL Injection", "Cross-Site Scripting (XSS)", "CSRF Exploits"],
  },
  {
    id: 3,
    title: "Network Penetration Testing",
    description:
      "Master network scanning, exploitation, and defense techniques. Includes labs on Nmap, Wireshark, and Metasploit.",
    image: "/course3.png",
    lessons: 20,
    duration: "15 hours",
    level: "Advanced",
    tools: [
      { name: "Metasploit", img: "/tools/metasploit.png" },
      { name: "Aircrack-ng", img: "/tools/aircrack.png" },
    ],
    attacks: [
      "ARP Spoofing",
      "Wi-Fi Cracking",
      "Privilege Escalation",
      "Exploit Development",
    ],
  },
];

export default function CourseDetailsPage() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === Number(id));

  if (!course) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Course Not Found</h1>
        <Link
          to="/learn"
          className="mt-6 inline-block bg-lime-500 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-lime-400 transition"
        >
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        {/* Course Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <img
            src={course.image}
            alt={course.title}
            className="rounded-2xl w-full md:w-1/3 h-64 object-cover shadow"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {course.title}
            </h1>
            <p className="text-gray-700 mb-6">{course.description}</p>

            <ul className="text-gray-800 mb-6 space-y-2">
              <li>📚 Lessons: {course.lessons}</li>
              <li>⏱ Duration: {course.duration}</li>
              <li>🎯 Level: {course.level}</li>
            </ul>

            <Link
              to="/signup"
              className="inline-block bg-lime-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-lime-400 transition"
            >
              Enroll Now
            </Link>
          </div>
        </div>

        {/* Tools Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🛠 Tools You Will Learn</h2>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {course.tools.map((tool, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <img src={tool.img} alt={tool.name} className="w-16 h-16 mb-4" />
                <span className="font-semibold text-gray-800">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Attacks Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            ⚔ Technical Attacks Covered
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {course.attacks.map((attack, index) => (
              <li key={index}>{attack}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
