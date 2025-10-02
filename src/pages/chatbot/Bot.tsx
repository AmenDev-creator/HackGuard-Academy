import { useState, useRef, useEffect } from "react";
import botIcon from "../../assets/bot.jpg";

export default function Bot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Small delay to ensure DOM is updated
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [messages, loading]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": import.meta.env.VITE_SITE_URL,
          "X-Title": import.meta.env.VITE_SITE_NAME,
        },
        body: JSON.stringify({
          model: "x-ai/grok-4-fast:free",
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "⚠️ No response";

      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "❌ Error connecting to chatbot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chatbot Icon */}
      <button onClick={toggleChat}>
        <img
          src={botIcon}
          alt="Chatbot"
          className="w-14 h-14 rounded-full shadow-lg border-2 border-lime-400 hover:scale-105 transition"
        />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-gray-900 text-white px-4 py-2 font-semibold">
            🤖 AI Tutor
          </div>
          <div
            ref={messagesContainerRef}
            className="flex-1 p-3 overflow-y-auto space-y-2 h-64 scroll-smooth"
            style={{ scrollBehavior: 'smooth' }}
          >
            {messages.length === 0 && (
              <div className="text-center text-gray-500 text-sm mt-8">
                <p>👋 Hi! I'm your AI Tutor.</p>
                <p>Ask me anything about cybersecurity!</p>
              </div>
            )}
            <div className="space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg max-w-[75%] break-words ${
                    msg.role === "user"
                      ? "ml-auto bg-lime-500 text-gray-900"
                      : "mr-auto bg-gray-200 text-gray-900"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {loading && (
                <div className="mr-auto bg-gray-200 text-gray-900 p-2 rounded-lg max-w-[75%]">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-600 ml-2">Thinking...</span>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>
          <div className="flex border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 outline-none text-sm"
            />
            <button
              onClick={sendMessage}
              className="bg-lime-500 text-gray-900 px-3 font-semibold hover:bg-lime-400 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
