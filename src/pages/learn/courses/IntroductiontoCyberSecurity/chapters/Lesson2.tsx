
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { db } from "../../../../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../../../../../contexts/useAuth";
import { useState } from "react";

const lesson2Content = `
# Lesson 2: Network Security Principles

**Introduction:** This lesson focuses on the technologies and practices used to protect computer networks and the data flowing through them. 

### Topics
- **Network Protocols:** TCP/IP, HTTP basics.
- **Firewalls:** Security barriers between trusted and untrusted networks.
- **IDS/IPS:**
  - IDS monitors suspicious traffic.
  - IPS blocks malicious traffic.
- **Encryption and Cryptography:** Protects data confidentiality and integrity (symmetric & asymmetric encryption).
`;

export default function Lesson2({ courseId, onComplete }: { courseId: string; onComplete: () => void }) {
  const { currentUser } = useAuth();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const verifyAnswer = () => {
    if (!selectedAnswer) return;
    if (selectedAnswer === "B") {
      setFeedback("Correct! IPS actively blocks malicious traffic.");
    } else {
      setFeedback("Incorrect. The correct answer is B) IPS.");
    }
  };

  const handleComplete = async () => {
    if (!currentUser) return;
    const progressRef = doc(db, "userProgress", currentUser.uid);
    await setDoc(progressRef, {
      courses: {
        [courseId]: 50 // 2/4 * 100
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
      <ReactMarkdown>{lesson2Content}</ReactMarkdown>

      {/* Example MCQ */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Quick Quiz</h3>
        <p>Which device actively blocks malicious traffic?</p>
        <div className="space-y-2">
          {["A", "B", "C", "D"].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="quiz2"
                value={option}
                checked={selectedAnswer === option}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="mr-2"
              />
              {option}) {option === "A" ? "IDS" : option === "B" ? "IPS" : option === "C" ? "Firewall (only monitoring)" : "Router"}
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
