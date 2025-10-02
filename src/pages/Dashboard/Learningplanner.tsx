import { useState, useEffect } from "react";
import { Calendar, Clock, BookOpen, Target } from "lucide-react";
import { useAuth } from "../../contexts/useAuth";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { courses } from "../../data/courses";
import Circletracker from "../../pages/learn/courses/IntroductiontoCyberSecurity/Circletracker";

interface StudySession {
  id: string;
  date: string;
  time: string;
  course: string;
  courseId: string;
  topic: string;
  completed: boolean;
  progress?: number;
  lessonId?: string;
}

interface CourseProgress {
  completedLessons: string[];
  progressPercent: number;
  lastUpdated: any;
  lessonProgresses?: Record<string, number>;
}


export default function Learningplanner() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [lessonProgresses, setLessonProgresses] = useState<Record<string, Record<string, number>>>({});
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const generateStudySessions = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const progressRef = doc(db, "userProgress", currentUser.uid);
        const progressSnap = await getDoc(progressRef);
        
        const generatedSessions: StudySession[] = [];
        
        if (progressSnap.exists()) {
          const data = progressSnap.data();
          const coursesProgress = data.courses || {};
          
          // Generate study sessions based on enrolled courses
          Object.entries(coursesProgress).forEach(([courseId, progress]) => {
            const course = courses.find(c => c.courseId === courseId);
            if (!course) return;

            const courseProgress = progress as CourseProgress;
            const completedLessons = courseProgress.completedLessons || [];
            const lessonProgressesData = courseProgress.lessonProgresses || {};
            setLessonProgresses(prev => ({ ...prev, [courseId]: lessonProgressesData }));
            const totalLessons = course.chapters.reduce((total, chapter) => total + chapter.lessons.length, 0);
            const remainingLessons = totalLessons - completedLessons.length;
            
            // Generate upcoming study sessions for incomplete lessons
            if (remainingLessons > 0) {
              const today = new Date();
              
              // Find next incomplete lesson
              let nextLessonFound = false;
              for (const chapter of course.chapters) {
                for (const lesson of chapter.lessons) {
                  if (!completedLessons.includes(lesson.id) && !nextLessonFound) {
                    // Schedule next lesson for tomorrow
                    const nextDate = new Date(today);
                    nextDate.setDate(today.getDate() + 1);
                    
                    generatedSessions.push({
                      id: `${courseId}-${lesson.id}`,
                      date: nextDate.toISOString().split('T')[0],
                      time: "2:00 PM",
                      course: course.title,
                      courseId,
                      topic: lesson.title,
                      completed: false,
                      progress: lessonProgressesData[lesson.id] || 0,
                      lessonId: lesson.id
                    });
                    nextLessonFound = true;
                  }
                }
              }
              
              // Add a review session for completed lessons if any exist
              if (completedLessons.length > 0) {
                const reviewDate = new Date(today);
                reviewDate.setDate(today.getDate() + 3);
                
                generatedSessions.push({
                  id: `${courseId}-review`,
                  date: reviewDate.toISOString().split('T')[0],
                  time: "10:00 AM",
                  course: course.title,
                  courseId,
                  topic: "Review completed lessons",
                  completed: false,
                  progress: courseProgress.progressPercent
                });
              }
            }
          });
        }
        
        // If no enrolled courses, suggest starting with free courses
        if (generatedSessions.length === 0) {
          const freeCourses = courses.filter(c => c.category === "Free");
          const today = new Date();
          
          freeCourses.slice(0, 2).forEach((course, index) => {
            const startDate = new Date(today);
            startDate.setDate(today.getDate() + index + 1);
            
            generatedSessions.push({
              id: `suggested-${course.courseId}`,
              date: startDate.toISOString().split('T')[0],
              time: index === 0 ? "10:00 AM" : "2:00 PM",
              course: course.title,
              courseId: course.courseId,
              topic: "Start this course",
              completed: false
            });
          });
        }
        
        setSessions(generatedSessions);
      } catch (error) {
        console.error("Error generating study sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    generateStudySessions();
  }, [currentUser]);

  const getCurrentWeek = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      week.push(date);
    }
    return week;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getSessionsForDate = (date: Date) => {
    const dateStr = formatDate(date);
    return sessions.filter(session => session.date === dateStr);
  };

  const weekDays = getCurrentWeek();

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="text-lime-500" size={24} />
        <h3 className="text-xl font-semibold text-gray-900">Learning Planner</h3>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date, index) => {
          const daySessions = getSessionsForDate(date);
          const isToday = formatDate(date) === formatDate(new Date());

          return (
            <div
              key={index}
              className={`min-h-[100px] border rounded-lg p-2 ${
                isToday ? 'border-lime-500 bg-lime-50' : 'border-gray-200'
              }`}
            >
              <div className={`text-sm font-medium mb-1 ${
                isToday ? 'text-lime-700' : 'text-gray-700'
              }`}>
                {date.getDate()}
              </div>

              <div className="space-y-1">
                {daySessions.map(session => (
                  <div
                    key={session.id}
                    className={`text-xs p-1 rounded ${
                      session.completed
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                    title={`${session.course}: ${session.topic} at ${session.time}`}
                  >
                    <div className="flex items-center gap-1">
                      <Clock size={10} />
                      <span className="truncate">{session.time}</span>
                    </div>
                    <div className="truncate mt-0.5">{session.topic}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
          <Target className="text-lime-500" size={20} />
          Upcoming Sessions
        </h4>
        {loading ? (
          <p className="text-gray-600">Loading your study plan...</p>
        ) : (
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {sessions.filter(s => !s.completed).slice(0, 3).map(session => {
              const progress = session.lessonId
                ? lessonProgresses[session.courseId]?.[session.lessonId] || 0
                : session.progress || 0;
              return (
                <div key={session.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <BookOpen className="text-lime-500" size={16} />
                  <div className="flex-grow">
                    <div className="text-sm font-medium text-gray-900">{session.topic}</div>
                    <div className="text-xs text-gray-600">{session.course}</div>
                    <Circletracker progress={progress} />
                  </div>
                  <div className="text-xs text-gray-500">{session.time}</div>
                </div>
              );
            })}
            {sessions.filter(s => !s.completed).length === 0 && (
              <p className="text-gray-600 text-sm">No upcoming sessions. Enroll in a course to get started!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}