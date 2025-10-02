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
import Bot from "../../../chatbot/Bot";

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
    title: "Foundations of Cybersecurity",
    lessons: [
      {
        id: "lesson-1-1",
        title: "Defining Cybersecurity",
        videoUrl: "https://www.youtube.com/watch?v=inWWhr5tnEA"
      },
      {
        id: "lesson-1-2",
        title: "The CIA Triad",
        videoUrl: "https://www.youtube.com/watch?v=SBcDGb9l6yo"
      },
      {
        id: "lesson-1-3",
        title: "Threat Actors and Attack Vectors",
        videoUrl: "https://www.youtube.com/watch?v=w7x1a1v3vUU"
      },
      {
        id: "lesson-1-4",
        title: "The Kill Chain and ATT&CK Frameworks",
        videoUrl: "https://www.youtube.com/watch?v=WnK5i2l4-g0"
      },
      {
        id: "lesson-1-5",
        title: "Legal and Ethical Considerations",
        videoUrl: "https://www.youtube.com/watch?v=SVZfNnAD6jE"
      }
    ]
  },
  {
    id: "chapter-2",
    title: "Security Controls and Best Practices",
    lessons: [
      {
        id: "lesson-2-1",
        title: "Types of Security Controls",
        videoUrl: "https://www.youtube.com/watch?v=wYiJWfZ9n0o"
      },
      {
        id: "lesson-2-2",
        title: "Cryptography Fundamentals",
        videoUrl: "https://www.youtube.com/watch?v=6v8DJ19y_8w"
      },
      {
        id: "lesson-2-3",
        title: "Network Security Basics",
        videoUrl: "https://www.youtube.com/watch?v=ffD8cNe8vNk"
      },
      {
        id: "lesson-2-4",
        title: "Endpoint Security",
        videoUrl: "https://www.youtube.com/watch?v=fJULk7BlcTs"
      },
      {
        id: "lesson-2-5",
        title: "Physical Security Measures",
        videoUrl: "https://www.youtube.com/watch?v=1sJ5EoGf6S8"
      }
    ]
  },
  {
    id: "chapter-3",
    title: "Risk Management and Incident Response",
    lessons: [
      {
        id: "lesson-3-1",
        title: "Introduction to Risk Management",
        videoUrl: "https://www.youtube.com/watch?v=spBvssOUTbM"
      },
      {
        id: "lesson-3-2",
        title: "Business Continuity and Disaster Recovery",
        videoUrl: "https://www.youtube.com/watch?v=8Hg1bmFqZ8E"
      },
      {
        id: "lesson-3-3",
        title: "The Incident Response Lifecycle",
        videoUrl: "https://www.youtube.com/watch?v=1rL7a6fZluQ"
      },
      {
        id: "lesson-3-4",
        title: "Digital Forensics Fundamentals",
        videoUrl: "https://www.youtube.com/watch?v=6WUvS6b8nSM"
      },
      {
        id: "lesson-3-5",
        title: "Tools of the Trade: Shell and Nmap",
        videoUrl: "https://www.youtube.com/watch?v=5E3N6zFEXsM"
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
  const course = courses.find(c => c.id === parseInt(id || "1"));

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
      <div className="max-w-full md:max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-4 md:mb-6">
          <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">{course.title} - Course Foundation</h1>
          <p className="text-gray-600 text-sm md:text-base">Interactive learning experience with video lessons</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Sidebar - Course Lessons */}
          <div className="md:col-span-1 lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Course Curriculum</h2>

              <div className="space-y-3 max-h-64 md:max-h-96 overflow-y-auto">
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
          <div className="md:col-span-1 lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
              {currentLesson ? (
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">{currentLesson.title}</h3>
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
      <Bot />
    </div>
  );
}