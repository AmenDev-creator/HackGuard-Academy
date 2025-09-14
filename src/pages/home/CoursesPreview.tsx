// src/pages/Home/CoursesPreview.tsx
import { Link } from "react-router";
import { useState, useEffect, useRef } from "react";


const courses = [
  {
    id: 1,
    title: "Introduction to Cyber Security",
    description: "Learn the basics of cyber security and ethical hacking.",
    
  },
  {
    id: 2,
    title: "Web Application Security",
    description: "Understand how web apps are hacked and how to secure them.",
    
  },
  {
    id: 3,
    title: "Network Penetration Testing",
    description: "Hands-on labs to master network security testing.",
    
  },
];

export default function CoursesPreview() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2
          className={`text-3xl font-bold text-gray-900 mb-12 transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          Explore Our <span className="text-lime-500">Courses</span>
        </h2>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className={`bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-1000 p-6 hover:scale-105 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: isVisible ? `${(index + 1) * 200}ms` : '0ms'
              }}
            >
              <img
                
                alt={course.title}
                className="rounded-xl w-full h-40 object-cover mb-4 transition-transform duration-300 hover:scale-105"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <Link
                to={`/learn/${course.id}`}
                className="inline-block bg-lime-500 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-lime-400 transition-all duration-300 hover:scale-105"
              >
                Enroll
              </Link>
            </div>
          ))}
        </div>

        {/* See all courses */}
        <div
          className={`mt-10 transition-all duration-1000 delay-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <Link
            to="/learn"
            className="text-lime-500 font-semibold hover:underline transition-all duration-300 hover:scale-105 inline-block"
          >
            See All Courses →
          </Link>
        </div>
      </div>
    </section>
  );
}
