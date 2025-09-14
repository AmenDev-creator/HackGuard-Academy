// src/pages/Home/FeaturesSection.tsx
import { Shield, BookOpen, Award } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const features = [
  {
    icon: <Shield className="w-10 h-10 text-lime-500" />,
    title: "Hands-on Cyber Security",
    description: "Learn by practicing real-world labs and simulations.",
  },
  {
    icon: <BookOpen className="w-10 h-10 text-lime-500" />,
    title: "Structured Courses",
    description: "Step-by-step courses from beginner to advanced levels.",
  },
  {
    icon: <Award className="w-10 h-10 text-lime-500" />,
    title: "Certificates",
    description: "Earn certificates to showcase your cybersecurity skills.",
  },
];

export default function FeaturesSection() {
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
    <section ref={sectionRef} className="bg-white py-16">
      <div className="container mx-auto px-6 text-center">
        <h2
          className={`text-3xl font-bold text-gray-900 mb-12 transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          Why Choose <span className="text-lime-500">HackGuard Academy?</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-gray-50 rounded-2xl shadow p-8 hover:shadow-lg transition-all duration-1000 hover:scale-105 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: isVisible ? `${(index + 1) * 200}ms` : '0ms'
              }}
            >
              <div className="flex justify-center mb-4 transform transition-transform duration-300 hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
