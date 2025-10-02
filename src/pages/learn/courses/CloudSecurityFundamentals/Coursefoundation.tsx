import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router";
import { courses } from "../../../../data/courses";
import { db } from "../../../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../../../contexts/useAuth";
import Quiz from "../../../../components/Quiz";
import Circletracker from "./Circletracker";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface LessonVideo {
  id: string;
  title: string;
  videoUrl: string;
}

interface ChapterVideos {
  id: string;
  title: string;
  lessons: LessonVideo[];
}

const courseVideos: ChapterVideos[] = [
  {
    id: "chapter-1",
    title: "Cloud Security Concepts",
    lessons: [
      {
        id: "lesson-1-1",
        title: "Introduction to Cloud Computing",
        videoUrl: "https://www.youtube.com/watch?v=SrE1X3SVkY4"
      },
      {
        id: "lesson-1-2",
        title: "Shared Responsibility Model",
        videoUrl: "https://www.youtube.com/watch?v=3UV5X1wROoM"
      },
      {
        id: "lesson-1-3",
        title: "Cloud Threats and Vulnerabilities",
        videoUrl: "https://www.youtube.com/watch?v=G2r5y7wi5DA"
      },
      {
        id: "lesson-1-4",
        title: "Securing IAM in the Cloud",
        videoUrl: "https://www.youtube.com/watch?v=b5QJseWEQ5E"
      }
    ]
  },
  {
    id: "chapter-2",
    title: "Securing Cloud Platforms",
    lessons: [
      {
        id: "lesson-2-1",
        title: "AWS Security Services",
        videoUrl: "https://www.youtube.com/watch?v=FQU1ewZ-RfY"
      },
      {
        id: "lesson-2-2",
        title: "Azure Security Services",
        videoUrl: "https://www.youtube.com/watch?v=4H9rkLtGPJw"
      },
      {
        id: "lesson-2-3",
        title: "GCP Security Services",
        videoUrl: "https://www.youtube.com/watch?v=K2rn3Mx0Q2A"
      },
      {
        id: "lesson-2-4",
        title: "Container & Serverless Security",
        videoUrl: "https://www.youtube.com/watch?v=0LNKbcSbrR8"
      }
    ]
  },
  {
    id: "chapter-3",
    title: "Operations and Compliance",
    lessons: [
      {
        id: "lesson-3-1",
        title: "CSPM & CWPP",
        videoUrl: "https://www.youtube.com/watch?v=z8sFnRY0Fuk"
      },
      {
        id: "lesson-3-2",
        title: "Cloud Monitoring and Logging",
        videoUrl: "https://www.youtube.com/watch?v=wH0yp4C8AIk"
      },
      {
        id: "lesson-3-3",
        title: "Compliance and Governance",
        videoUrl: "https://www.youtube.com/watch?v=0UQYYQoJd6E"
      }
    ]
  }
];

export default function Coursefoundation() {
  const { id } = useParams<{ id: string }>();
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set(["chapter-1"]));
  const [currentLesson, setCurrentLesson] = useState<LessonVideo | null>(courseVideos[0].lessons[0]);
  const [lessonProgresses, setLessonProgresses] = useState<Record<string, number>>({});
  const playerRef = useRef<HTMLDivElement>(null);

  const { currentUser } = useAuth();
  const course = courses.find(c => c.id === parseInt(id || "5"));

  // Fetch progress from Firestore
  useEffect(() => {
    const fetchProgress = async () => {
      if (!currentUser || !course) {
        return;
      }

      try {
        const progressRef = doc(db, "userProgress", currentUser.uid);
        const progressSnap = await getDoc(progressRef);

        if (progressSnap.exists()) {
          const data = progressSnap.data();
          const courseProgress = data.courses?.[course.courseId] || {};

          if (courseProgress.completedLessons) {
            // Progress calculation removed as progressPercent is not used
          }

          const lessonProgressesData = courseProgress.lessonProgresses || {};
          setLessonProgresses(lessonProgressesData);
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, [currentUser, course]);

  const saveProgress = async (lessonId: string, progress: number) => {
    if (!currentUser || !course) return;
    try {
      const progressRef = doc(db, "userProgress", currentUser.uid);
      const currentData = (await getDoc(progressRef)).data() || {};
      const courseProgress = currentData.courses?.[course.courseId] || {};
      const updatedLessonProgresses = { ...courseProgress.lessonProgresses, [lessonId]: progress };

      // Update completedLessons based on progress
      const currentCompletedLessons = courseProgress.completedLessons || [];
      let updatedCompletedLessons = [...currentCompletedLessons];
      if (progress >= 100) {
        if (!updatedCompletedLessons.includes(lessonId)) {
          updatedCompletedLessons.push(lessonId);
        }
      } else {
        updatedCompletedLessons = updatedCompletedLessons.filter(id => id !== lessonId);
      }

      await updateDoc(progressRef, {
        [`courses.${course.courseId}.lessonProgresses`]: updatedLessonProgresses,
        [`courses.${course.courseId}.completedLessons`]: updatedCompletedLessons
      });
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);
    }
  }, []);

  // Create/destroy player
  useEffect(() => {
    if (currentLesson && window.YT && window.YT.Player && playerRef.current) {
      const videoId = getVideoId(currentLesson.videoUrl);
      const newPlayer = new window.YT.Player(playerRef.current, {
        videoId,
        events: {
          onReady: () => {
            const interval = setInterval(() => {
              if (newPlayer && newPlayer.getCurrentTime && newPlayer.getDuration) {
                const current = newPlayer.getCurrentTime();
                const duration = newPlayer.getDuration();
                if (duration > 0) {
                  const progress = (current / duration) * 100;
                  setLessonProgresses(prev => ({ ...prev, [currentLesson.id]: progress }));
                  saveProgress(currentLesson.id, progress);
                }
              }
            }, 1000);
            (newPlayer as any).progressInterval = interval;
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              setLessonProgresses(prev => ({ ...prev, [currentLesson.id]: 100 }));
              saveProgress(currentLesson.id, 100);
            }
          }
        }
      });
      return () => {
        if (newPlayer && (newPlayer as any).progressInterval) {
          clearInterval((newPlayer as any).progressInterval);
        }
        newPlayer.destroy();
      };
    }
  }, [currentLesson]);

  if (!course) return <div>Course not found</div>;


  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  const selectLesson = (lesson: LessonVideo) => {
    setCurrentLesson(lesson);
  };

  const getVideoId = (url: string) => {
    const match = url.match(/[?&]v=([^#\&\?]*).*/);
    return match && match[1];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title} - Course Foundation</h1>
          <p className="text-gray-600">Interactive learning experience with video lessons</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Course Lessons */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Course Curriculum</h2>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {courseVideos.map((chapter) => (
                  <div key={chapter.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleChapter(chapter.id)}
                      className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors bg-gray-50"
                    >
                      <span className="font-semibold text-left text-gray-900 text-sm">{chapter.title}</span>
                      {expandedChapters.has(chapter.id) ? (
                        <ChevronDown size={16} className="text-gray-500" />
                      ) : (
                        <ChevronRight size={16} className="text-gray-500" />
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
                          <div className="p-3 space-y-2">
                            {chapter.lessons.map((lesson) => (
                              <button
                                key={lesson.id}
                                onClick={() => selectLesson(lesson)}
                                className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition-colors ${
                                  currentLesson?.id === lesson.id
                                    ? 'bg-lime-100 text-lime-700 border border-lime-300'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`}
                              >
                                <Play size={14} className="flex-shrink-0" />
                                <Circletracker progress={lessonProgresses[lesson.id] || 0} />
                                <span className="text-sm font-medium">{lesson.title}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Video Container */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {currentLesson ? (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{currentLesson.title}</h3>
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <div ref={playerRef} className="w-full h-full"></div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">Select a lesson to start watching</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Course Quiz */}
        <Quiz quiz={course.quiz} isLocked={false} courseId={course.courseId} />
      </div>
    </div>
  );
}