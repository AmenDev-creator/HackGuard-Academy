import { useState } from "react";
import { ChevronDown, ChevronRight, CheckCircle, XCircle, Award, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import type { Quiz as QuizType } from "../data/courses";

interface QuizProps {
  quiz: QuizType;
  isLocked?: boolean;
  courseId?: string;
}

export default function Quiz({ quiz, isLocked = false, courseId }: QuizProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: quiz.questions.length, percentage: Math.round((correct / quiz.questions.length) * 100) };
  };

  const toggleQuiz = () => {
    setIsExpanded(!isExpanded);
  };

  const currentQuestionData = quiz.questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestionData?.id] !== undefined;
  const canProceed = isAnswered;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
      <button
        onClick={toggleQuiz}
        disabled={isLocked}
        className={`w-full flex items-center justify-between p-4 transition-colors rounded-lg ${
          isLocked ? 'cursor-not-allowed opacity-60' : 'hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-3">
          {isLocked ? (
            <Lock className="text-gray-500" size={24} />
          ) : (
            <Award className="text-lime-500" size={24} />
          )}
          <h2 className="text-2xl font-bold text-gray-900">{quiz.title}</h2>
          {isLocked && <span className="text-sm text-gray-500 ml-2">(Complete course to unlock)</span>}
        </div>
        {isExpanded ? (
          <ChevronDown size={24} className="text-gray-500" />
        ) : (
          <ChevronRight size={24} className="text-gray-500" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            {!showResults ? (
              <div className="space-y-6">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Question {currentQuestion + 1} of {quiz.questions.length}</span>
                    <span className="font-medium text-lime-600">
                      {Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-lime-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Current Question */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {currentQuestionData.question}
                  </h3>
                  
                  <div className="space-y-3">
                    {currentQuestionData.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(currentQuestionData.id, index)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          selectedAnswers[currentQuestionData.id] === index
                            ? 'border-lime-500 bg-lime-50 text-lime-700'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <span className="font-medium mr-3">
                          {String.fromCharCode(97 + index)})
                        </span>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestion === 0}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <button
                    onClick={handleNextQuestion}
                    disabled={!canProceed}
                    className="px-6 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {currentQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  </button>
                </div>
              </div>
            ) : (
              /* Quiz Results */
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-lime-100 rounded-full mb-4">
                    <Award className="text-lime-600" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h3>
                  <div className="text-lg">
                    <span className="text-gray-600">Your Score: </span>
                    <span className="font-bold text-lime-600">
                      {calculateScore().correct}/{calculateScore().total} ({calculateScore().percentage}%)
                    </span>
                  </div>
                </div>

                {/* Detailed Results */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">Review Your Answers</h4>
                  {quiz.questions.map((question, index) => {
                    const userAnswer = selectedAnswers[question.id];
                    const isCorrect = userAnswer === question.correctAnswer;
                    
                    return (
                      <div key={question.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start gap-3 mb-3">
                          {isCorrect ? (
                            <CheckCircle className="text-green-500 mt-1" size={20} />
                          ) : (
                            <XCircle className="text-red-500 mt-1" size={20} />
                          )}
                          <div className="flex-grow">
                            <h5 className="font-medium text-gray-900 mb-2">
                              Question {index + 1}: {question.question}
                            </h5>
                            <div className="space-y-1 text-sm">
                              <p className={`${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                Your answer: {String.fromCharCode(97 + userAnswer)}) {question.options[userAnswer]}
                              </p>
                              {!isCorrect && (
                                <p className="text-green-700">
                                  Correct answer: {String.fromCharCode(97 + question.correctAnswer)}) {question.options[question.correctAnswer]}
                                </p>
                              )}
                              {question.explanation && (
                                <p className="text-gray-600 mt-2 italic">
                                  {question.explanation}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center space-y-4">
                  {courseId && (
                    <button
                      onClick={() => navigate(`/certificate/${courseId}`)}
                      className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      View Certificate
                    </button>
                  )}
                  <button
                    onClick={resetQuiz}
                    className="px-6 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}