
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { db } from "../../../../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../../../../../contexts/useAuth";
import { useState } from "react";

const lesson4Content = `
# Lesson 4: Protecting Data and Systems

**Introduction:** This lesson covers best practices to protect systems and data.

### Topics
- **Malware:** Viruses, ransomware, spyware.
- **Authentication and Access Control:**
  - Passwords, MFA, role-based access.
- **Social Engineering:** Phishing, pretexting, baiting.
- **Device Hardening:** Remove unnecessary services, apply patches, configure strong settings.
`;

export default function Lesson4({ courseId, onComplete }: { courseId: string; onComplete: () => void }) {
  const { currentUser } = useAuth();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const verifyAnswer = () => {
    if (!selectedAnswer) return;
    if (selectedAnswer === "C") {
      setFeedback("Correct! Phishing is a common social engineering attack.");
    } else {
      setFeedback("Incorrect. The correct answer is C) Phishing Email.");
    }
  };

  const handleComplete = async () => {
    if (!currentUser) return;
    const progressRef = doc(db, "userProgress", currentUser.uid);
    await setDoc(progressRef, {
      courses: {
        [courseId]: 100 // 4/4 * 100
      }
    }, { merge: true });
    alert("🎉 Congratulations! You have completed the Introduction to Cybersecurity course.");
    onComplete();
  };

  return (
    <motion.div
      className="prose max-w-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <ReactMarkdown>{lesson4Content}</ReactMarkdown>

      {/* Example MCQ */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Quick Quiz</h3>
        <p>Which of the following is an example of social engineering?</p>
        <div className="space-y-2">
          {["A", "B", "C", "D"].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="quiz4"
                value={option}
                checked={selectedAnswer === option}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="mr-2"
              />
              {option}) {option === "A" ? "Port Scanning" : option === "B" ? "SQL Injection" : option === "C" ? "Phishing Email" : "Using Wireshark"}
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
        Finish Course
      </button>
    </motion.div>
  );
}
