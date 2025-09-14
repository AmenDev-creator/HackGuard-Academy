// src/pages/Home/HeroSection.tsx
import { Link } from "react-router";
import { useState, useEffect, useRef } from "react";

// Custom hook for one-time typing effect
function useTypingEffect(text: string, speed: number = 100) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);


  useEffect(() => {
    if (isComplete) return;

    const handleType = () => {
      if (indexRef.current < text.length) {
        setDisplayText(text.substring(0, indexRef.current + 1));
        indexRef.current++;
        timeoutRef.current = window.setTimeout(handleType, speed);
;
      } else {
        setIsComplete(true);
      }
    };

    timeoutRef.current = window.setTimeout(handleType, speed);


    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, isComplete]);

  return { displayText, isComplete };
}

export default function HeroSection() {
  const { displayText: typedText, isComplete: typingComplete } = useTypingEffect("Learn Cyber Security", 100);

  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="inline-block min-h-[1.2em]">
              {typedText}
              {!typingComplete && <span className="animate-pulse text-lime-500">|</span>}
            </span>
            <br />
            <span
              className={`text-lime-500 transition-all duration-1000 ${
                typingComplete
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              Step by Step
            </span>
          </h1>
          
          {/* Paragraph with fade-in animation */}
          <p
            className={`text-lg text-gray-700 mb-8 transition-all duration-1000 delay-500 ${
              typingComplete
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            Access free and paid courses to start your journey in ethical hacking, penetration testing,
            and cybersecurity skills — from beginner to advanced.
          </p>
          
          {/* Buttons with staggered fade-in animation */}
          <div
            className={`flex justify-center md:justify-start space-x-4 transition-all duration-1000 delay-1000 ${
              typingComplete
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <Link
              to="/signup"
              className="bg-lime-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-lime-400 transition-all duration-300 hover:scale-105"
            >
              Join for FREE
            </Link>
            <Link
              to="/learn"
              className="border border-gray-900 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-105"
            >
              Explore Courses
            </Link>
          </div>
        </div>

        {/* Right Image with slide-in animation */}
        <div
          className={`flex-1 mt-10 md:mt-0 flex justify-center transition-all duration-1000 delay-700 ${
            typingComplete
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-8'
          }`}
        >
          <img
            src="/hero-image.png"   // 🖼️ بدّلها بصورة بانر عندك (تحطها في public/)
            alt="Cyber Security Illustration"
            className="w-full max-w-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
}
