import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { db } from "../../../../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../../../../../contexts/useAuth";
import { useState } from "react";

const lesson3Content = `
# Lesson 3: Practical Network Security Tools

**Introduction:** This lesson introduces two essential tools for network security analysis. 

### Tools
- **Nmap (Network Mapper):**
  - Scans networks for hosts, ports, and services.
  - Helps map the network landscape.
- **Wireshark:**
  - Real-time packet analyzer.
  - Identifies security breaches and diagnoses issues.
`;

export default function Lesson3({ courseId, onComplete }: { courseId: string; onComplete: () => void }) {
  const { currentUser } = useAuth();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const verifyAnswer = () => {
    if (!selectedAnswer) return;
    if (selectedAnswer === "B") {
      setFeedback("Correct! Wireshark allows packet-level analysis.");
    } else {
      setFeedback("Incorrect. The correct answer is B) Wireshark.");
    }
  };

  const handleComplete = async () => {
    if (!currentUser) return;
    const progressRef = doc(db, "userProgress", currentUser.uid);
    await setDoc(progressRef, {
      courses: {
        [courseId]: 75 // 3/4 * 100
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
      <ReactMarkdown>{lesson3Content}</ReactMarkdown>

      {/* Example MCQ */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Quick Quiz</h3>
        <p>Which tool allows packet-level analysis of network traffic?</p>
        <div className="space-y-2">
          {["A", "B", "C", "D"].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="quiz3"
                value={option}
                checked={selectedAnswer === option}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="mr-2"
              />
              {option}) {option === "A" ? "Nmap" : option === "B" ? "Wireshark" : option === "C" ? "Firewall" : "IDS"}
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
