import { useState, useEffect } from "react";
import { Bell, TrendingUp, Target, CheckCircle } from "lucide-react";
import { useAuth } from "../../contexts/useAuth";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { courses } from "../../data/courses";

interface Reminder {
  id: string;
  message: string;
  type: 'deadline' | 'goal' | 'motivation';
  priority: 'high' | 'medium' | 'low';
}

interface CourseProgress {
  [courseId: string]: number;
}

export default function Personalremider() {
  const { currentUser } = useAuth();
  const [progressData, setProgressData] = useState<CourseProgress>({});

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
      }
    };

    fetchProgress();
  }, [currentUser]);

  const generateWeeklyReport = () => {
    if (Object.keys(progressData).length === 0) {
      return "Start your learning journey this week!";
    }

    // Sample weekly stats (in a real app, this would be calculated from actual weekly data)
    const lessonsCompleted = 3;
    const labsCompleted = 2;

    // Find the course with lowest progress (closest to completion)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let closestCourse: any = null;
    let minProgress = 100;

    Object.entries(progressData).forEach(([courseId, progress]) => {
      if (progress < minProgress) {
        minProgress = progress;
        closestCourse = courses.find(c => c.courseId === courseId);
      }
    });

    if (!closestCourse || minProgress >= 100) {
      return "Congratulations! You've completed all your enrolled courses this week.";
    }

    const remainingProgress = 100 - minProgress;
    const estimatedDays = Math.ceil(remainingProgress / 10); // Assuming 10% progress per day

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return `You completed ${lessonsCompleted} lessons and ${labsCompleted} labs this week. At this pace, you'll finish '${(closestCourse as any).title}' in ${estimatedDays} days.`;
  };

  const generateReminders = (): Reminder[] => {
    const reminders: Reminder[] = [];

    if (Object.keys(progressData).length === 0) {
      reminders.push({
        id: '1',
        message: 'Start your cybersecurity learning journey today!',
        type: 'motivation',
        priority: 'high'
      });
      return reminders;
    }

    // Check for incomplete courses
    Object.entries(progressData).forEach(([courseId, progress]) => {
      if (progress < 100) {
        const course = courses.find(c => c.courseId === courseId);
        if (course) {
          reminders.push({
            id: `course-${courseId}`,
            message: `Continue learning ${course.title} (${progress}% complete)`,
            type: 'goal',
            priority: progress < 25 ? 'high' : 'medium'
          });
        }
      }
    });

    // Add motivational reminders
    if (reminders.length === 0) {
      reminders.push({
        id: 'completed',
        message: 'Excellent work! All courses completed. Consider advanced topics.',
        type: 'motivation',
        priority: 'low'
      });
    } else {
      reminders.push({
        id: 'consistency',
        message: 'Remember: Consistent daily practice leads to mastery!',
        type: 'motivation',
        priority: 'medium'
      });
    }

    return reminders.slice(0, 3); // Limit to 3 reminders
  };

  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'deadline':
        return <Target className="text-red-500" size={16} />;
      case 'goal':
        return <TrendingUp className="text-blue-500" size={16} />;
      case 'motivation':
        return <CheckCircle className="text-green-500" size={16} />;
      default:
        return <Bell className="text-gray-500" size={16} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const reminders = generateReminders();
  const weeklyReport = generateWeeklyReport();

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="text-lime-500" size={24} />
        <h3 className="text-xl font-semibold text-gray-900">Personal Reminders</h3>
      </div>

      {/* Weekly Report */}
      <div className="mb-6 p-4 bg-lime-50 border border-lime-200 rounded-lg">
        <div className="flex items-start gap-3">
          <TrendingUp className="text-lime-600 mt-0.5" size={20} />
          <div>
            <h4 className="text-sm font-medium text-lime-800 mb-1">Weekly Learning Report</h4>
            <p className="text-sm text-lime-700">{weeklyReport}</p>
          </div>
        </div>
      </div>

      {/* Reminders */}
      <div className="space-y-3">
        <h4 className="text-lg font-medium text-gray-900">Reminders</h4>
        {reminders.length === 0 ? (
          <p className="text-gray-600">No reminders at this time.</p>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`flex items-start gap-3 p-3 border rounded-lg ${getPriorityColor(reminder.priority)}`}
              >
                {getReminderIcon(reminder.type)}
                <div className="flex-grow">
                  <p className="text-sm text-gray-800">{reminder.message}</p>
                  <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                    reminder.priority === 'high' ? 'bg-red-100 text-red-700' :
                    reminder.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {reminder.priority} priority
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}