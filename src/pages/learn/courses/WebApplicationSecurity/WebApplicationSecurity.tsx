import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, BookOpen, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { courses } from "../../../../data/courses";
import { db } from "../../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../../../contexts/useAuth";
import Bot from "../../../chatbot/Bot";
import Quiz from "../../../../components/Quiz";

export default function WebApplicationSecurity() {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set());
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [progressPercent, setProgressPercent] = useState(0);

  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const course = courses.find(c => c.courseId === "web-application-security");
  if (!course) return <div>Course not found</div>;

  // Calculate total lessons in course
  const totalLessons = course.chapters.reduce((total, chapter) => total + chapter.lessons.length, 0);

  // Fetch progress from Firestore
  useEffect(() => {
    const fetchProgress = async () => {
      if (!currentUser) {
        return;
      }

      try {
        const progressRef = doc(db, "userProgress", currentUser.uid);
        const progressSnap = await getDoc(progressRef);

        if (progressSnap.exists()) {
          const data = progressSnap.data();
          const courseProgress = data.courses?.[course.courseId] || {};

          if (courseProgress.completedLessons) {
            setCompletedLessons(new Set(courseProgress.completedLessons));
            const completedCount = courseProgress.completedLessons.length;
            const percent = Math.round((completedCount / totalLessons) * 100);
            setProgressPercent(percent);
          }
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, [currentUser, course.courseId, totalLessons]);

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  const toggleLesson = (lessonId: string) => {
    const newExpanded = new Set(expandedLessons);
    if (newExpanded.has(lessonId)) {
      newExpanded.delete(lessonId);
    } else {
      newExpanded.add(lessonId);
    }
    setExpandedLessons(newExpanded);
  };


  return (
    <div className="max-w-full md:max-w-4xl mx-auto p-4 md:p-6">
      {/* Course Header */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
          <img
            src={course.image}
            alt={course.title}
            className="w-24 h-18 md:w-32 md:h-24 rounded-xl object-cover flex-shrink-0"
          />
          <div className="flex-grow">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              {course.title}
            </h1>
            <p className="text-gray-600 text-base md:text-lg mb-4">{course.description}</p>
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-3">
              <span>Level: {course.level}</span>
              <span>Duration: {course.duration}</span>
            </div>
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-lime-600">{progressPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-lime-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Curriculum */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Course Curriculum</h2>

        <div className="space-y-4">
          {course.chapters.map((chapter) => (
            <div key={chapter.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleChapter(chapter.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors bg-gray-50"
              >
                <span className="font-semibold text-left text-gray-900">{chapter.title}</span>
                {expandedChapters.has(chapter.id) ? (
                  <ChevronDown size={20} className="text-gray-500" />
                ) : (
                  <ChevronRight size={20} className="text-gray-500" />
                )}
              </button>
              <AnimatePresence>
                {expandedChapters.has(chapter.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-100"
                  >
                    <div className="p-4 space-y-3">
                      {chapter.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            {completedLessons.has(lesson.id) ? (
                              <CheckCircle size={18} className="text-green-500" />
                            ) : (
                              <BookOpen size={18} className="text-lime-500" />
                            )}
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className={`font-medium ${completedLessons.has(lesson.id) ? 'text-green-700' : 'text-gray-900'}`}>
                                {lesson.title}
                              </h4>
                              <button
                                onClick={() => navigate(`/learn/${course.id}/foundation`)}
                                className="px-2 py-1 text-xs rounded bg-lime-500 text-white hover:bg-lime-600"
                              >
                                Discover
                              </button>
                            </div>
                            <div className="text-sm text-gray-600">
                              {expandedLessons.has(lesson.id) ? (
                                <div>
                                  <p className="mb-2">{lesson.content}</p>
                                  <button
                                    onClick={() => toggleLesson(lesson.id)}
                                    className="text-lime-600 hover:text-lime-700 text-xs font-medium"
                                  >
                                    Show Less
                                  </button>
                                </div>
                              ) : (
                                <div>
                                  <p className="line-clamp-2 mb-1">{lesson.content}</p>
                                  <button
                                    onClick={() => toggleLesson(lesson.id)}
                                    className="text-lime-600 hover:text-lime-700 text-xs font-medium"
                                  >
                                    Show More
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Course Quiz */}
      <Quiz quiz={course.quiz} isLocked={false} courseId={course.courseId} />
      
      {/* AI Chatbot */}
      <Bot />
    </div>
  );
}
