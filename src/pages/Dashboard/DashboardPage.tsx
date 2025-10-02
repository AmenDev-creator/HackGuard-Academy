// src/pages/DashboardPage.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/useAuth";
import { Clock, Star } from "lucide-react";
import { courses } from "../../data/courses";
import Searchbar from "./Searchbar";
import Auditlogs from "./Auditlogs";
import Learningplanner from "./Learningplanner";
import Personalremider from "./Personalremider";

interface ProgressInfo {
  progressPercent: number;
  completedLessons?: number;
  lastUpdated?: string;
}

interface CourseProgress {
  [courseId: string]: number | ProgressInfo;
}


export default function DashboardPage() {
  const { currentUser, setReturnUrl, setIsPremiumRedirect } = useAuth();
  const navigate = useNavigate();
  const [progressData, setProgressData] = useState<CourseProgress>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEnrollClick = (courseId: number, isPremium: boolean) => {
    if (!currentUser) {
      if (isPremium) {
        setIsPremiumRedirect(true);
        localStorage.setItem("selectedCourseId", courseId.toString());
        setReturnUrl(`/pricing`);
      } else {
        setReturnUrl(`/learn/${courseId}`);
      }
      navigate("/signin");
      return;
    }

    if (isPremium) {
      localStorage.setItem("selectedCourseId", courseId.toString());
      navigate("/pricing");
    } else {
      navigate(`/learn/${courseId}`);
    }
  };

  const enrolledCourseIds = Object.keys(progressData);
  const availableCourses = courses.filter(course => !enrolledCourseIds.includes(course.courseId));
  const filteredCourses = availableCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (!currentUser) return;

    const fetchProgress = async () => {
      try {
        const progressRef = doc(db, "userProgress", currentUser.uid);
        const snapshot = await getDoc(progressRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          setProgressData(data.courses || {});
        }
      } catch (err) {
        console.error("Error fetching progress:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Please sign in to view your dashboard
        </h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">
        Welcome back,{" "}
        <span className="text-lime-500">
          {currentUser.displayName || currentUser.email}
        </span>
      </h1>

      {loading ? (
        <p className="text-gray-600">Loading your progress...</p>
      ) : Object.keys(progressData).length === 0 ? (
        <p className="text-gray-600">You haven't enrolled in any courses yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {Object.entries(progressData).map(([courseId, progressInfo]) => {
            const course = courses.find(c => c.courseId === courseId);
            if (!course) return null;
            const route = `/learn/${course.id}`;
            
            // Handle both number and object progress formats
            const progressPercent = typeof progressInfo === 'number'
              ? progressInfo
              : (progressInfo as ProgressInfo)?.progressPercent || 0;
            
            return (
              <Link key={courseId} to={route} className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col cursor-pointer">
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
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-lime-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-700">
                    Progress: {progressPercent}%
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Audit Logs */}
      <div className="mt-12">
        <Auditlogs />
      </div>

      {/* Learning Planner */}
      <div className="mt-12">
        <Learningplanner />
      </div>

      {/* Personal Reminders */}
      <div className="mt-12">
        <Personalremider />
      </div>

      {/* Discover New Courses */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Discover New Courses</h2>
        <Searchbar value={searchQuery} onChange={setSearchQuery} />
        {searchQuery && filteredCourses.length > 0 && (
          <ul className="bg-white rounded-lg shadow p-4">
            {filteredCourses.map((course) => (
              <li key={course.id} className="border-b border-gray-200 last:border-b-0 py-2">
                <button
                  onClick={() => handleEnrollClick(course.id, course.category === "Premium")}
                  className="text-left w-full hover:text-lime-600 transition-colors"
                >
                  {course.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
