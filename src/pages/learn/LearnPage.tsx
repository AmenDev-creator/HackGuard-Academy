// src/pages/Learn/LearnPage.tsx
import { useState } from "react";
import { Clock, Star, DollarSign, Lock } from "lucide-react";
import { useAuth } from "../../contexts/useAuth";
import { useNavigate } from "react-router";

import { courses } from "../../data/courses";

export default function LearnPage() {
  const [filter, setFilter] = useState("All");
  const { currentUser, userProfile, setReturnUrl, setIsPremiumRedirect } = useAuth();
  const navigate = useNavigate();

  const filteredCourses =
    filter === "All" ? courses : courses.filter((c) => c.category === filter);

  const handleEnrollClick = (courseId: number, isPremium: boolean, courseIdStr: string) => {
    if (!currentUser) {
      if (isPremium) {
        setIsPremiumRedirect(true);
        localStorage.setItem("selectedCourseId", courseId.toString());
        const pricingRoute = getPricingRoute(courseIdStr);
        setReturnUrl(pricingRoute);
      } else {
        setReturnUrl(`/learn/${courseId}`);
      }
      navigate("/signin");
      return;
    }

    if (isPremium) {
      if (isCoursePurchased(courseId)) {
        // Already purchased, go to course
        navigate(`/learn/${courseId}`);
      } else {
        // Not purchased, go to pricing
        localStorage.setItem("selectedCourseId", courseId.toString());
        const pricingRoute = getPricingRoute(courseIdStr);
        navigate(pricingRoute);
      }
    } else {
      navigate(`/learn/${courseId}`);
    }
  };

  const getPricingRoute = (courseIdStr: string) => {
    switch (courseIdStr) {
      case "web-application-security":
        return "/pricing/web-app-security";
      case "network-penetration-testing":
        return "/pricing/network-pentesting";
      case "cloud-security-fundamentals":
        return "/pricing/cloud-security";
      case "advanced-ethical-hacking":
        return "/pricing/advanced-ethical-hacking";
      default:
        return "/pricing";
    }
  };

  const isCoursePurchased = (courseId: number) => {
    return userProfile?.purchasedCourses?.includes(courseId.toString()) || false;
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
          All <span className="text-lime-500">Courses</span>
        </h1>

        {/* Filters */}
        <div className="flex justify-center gap-4 mb-8">
          {["All", "Free", "Premium"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                filter === f
                  ? "bg-lime-500 text-gray-900"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {filteredCourses.map((course) => (
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
              <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                <Star size={16} /> {course.level}
                <Clock size={16} /> {course.duration}
              </p>
              <p className="text-sm font-bold mt-1 flex items-center gap-2">
                <DollarSign size={16} /> {course.price}
              </p>

              <button
                onClick={() =>
                  handleEnrollClick(course.id, course.category === "Premium", course.courseId)
                }
                className={`mt-4 inline-block px-4 py-2 rounded-lg font-semibold text-center ${
                  course.category === "Premium"
                    ? isCoursePurchased(course.id)
                      ? "bg-lime-500 text-gray-900 hover:bg-lime-400 flex items-center justify-center gap-2"
                      : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg border border-purple-700 flex items-center justify-center gap-2 transition-all duration-300"
                    : "bg-lime-500 text-gray-900 hover:bg-lime-400 flex items-center justify-center gap-2"
                }`}
              >
                {course.category === "Premium" ? (
                  isCoursePurchased(course.id) ? (
                    "Enroll"
                  ) : (
                    <>
                      <Lock size={16} className="animate-pulse" />
                      Premium
                    </>
                  )
                ) : (
                  "Enroll"
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
