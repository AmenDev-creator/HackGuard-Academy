
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { db } from "../../../../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../../../../../contexts/useAuth";
import { useState } from "react";

const lesson1Content = `
# Lesson 1: Cybersecurity Fundamentals

**Introduction:** This lesson defines the core principles of cybersecurity and introduces the fundamental framework used to secure information. We'll explore the foundational concepts that govern all security practices.

### CIA Triad
- **Confidentiality:** Ensures that data is kept private.
- **Integrity:** Guarantees data accuracy.
- **Availability:** Confirms systems are accessible.

### Threats, Vulnerabilities, and Attacks
- **Threats:** Potential dangers (malware, hackers).
- **Vulnerabilities:** Weaknesses that threats exploit.
- **Attack:** Act of exploiting a vulnerability.

🎥 [Introduction to Cyber Security](https://www.youtube.com/watch?v=IVoSTaURC2k)
`;

export default function Lesson1({ courseId, onComplete }: { courseId: string; onComplete: () => void }) {
  const { currentUser } = useAuth();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const verifyAnswer = () => {
    if (!selectedAnswer) return;
    if (selectedAnswer === "D") {
      setFeedback("Correct! Scalability is not part of the CIA Triad.");
    } else {
      setFeedback("Incorrect. The correct answer is D) Scalability.");
    }
  };

  const handleComplete = async () => {
    if (!currentUser) return;
    const progressRef = doc(db, "userProgress", currentUser.uid);
    await setDoc(progressRef, {
      courses: {
        [courseId]: 25 // 1/4 * 100
      }
    }, { merge: true });
    onComplete();
  };

  return (
    <motion.div
      className="prose max-w-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <ReactMarkdown>{lesson1Content}</ReactMarkdown>

      {/* Example MCQ */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Quick Quiz</h3>
        <p>Which of the following is NOT part of the CIA Triad?</p>
        <div className="space-y-2">
          {["A", "B", "C", "D"].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="quiz1"
                value={option}
                checked={selectedAnswer === option}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="mr-2"
              />
              {option}) {option === "A" ? "Confidentiality" : option === "B" ? "Integrity" : option === "C" ? "Availability" : "Scalability"}
            </label>
          ))}
        </div>
        <button
          onClick={verifyAnswer}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400"
          disabled={!selectedAnswer}
        >
          Verify
        </button>
        {feedback && <p className="mt-2 text-sm">{feedback}</p>}
      </div>

      <button
        onClick={handleComplete}
        className="mt-6 bg-lime-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-lime-400"
      >
        Mark as Complete
      </button>
    </motion.div>
  );
}
