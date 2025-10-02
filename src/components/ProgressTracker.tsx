import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "../contexts/useAuth";

type ProgressTrackerProps = {
  courseId: string;
  totalLessons: number;
};

export default function ProgressTracker({ courseId, totalLessons }: ProgressTrackerProps) {
  const { currentUser } = useAuth();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!currentUser) return;

    const progressRef = doc(db, "userProgress", currentUser.uid);
    const unsubscribe = onSnapshot(progressRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        const completedLessons = data.courses?.[courseId] || 0;
        setProgress(Math.round((completedLessons / 100) * totalLessons));
      }
    });

    return unsubscribe;
  }, [currentUser, courseId, totalLessons]);

  const percent = Math.round((progress / totalLessons) * 100);

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
      <div
        className="bg-lime-500 h-4 rounded-full transition-all duration-500"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}
