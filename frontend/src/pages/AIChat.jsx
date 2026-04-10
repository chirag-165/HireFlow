import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { pageVariants } from '../utils/motionVariants';
import { Send, Bot, User, Sparkles } from 'lucide-react';

export default function AIChat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your HireFlow AI assistant. How can I help you tailor your resume or prepare for your next interview?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "That sounds like a great plan! I can certainly help you optimize your profile for that role. Could you paste the job description here?",
        sender: 'bot'
      }]);
    }, 1500);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      // FIX: Changed to h-full and added w-full. It now perfectly fills the parent container without forcing a viewport recalculation.
      className="h-full w-full flex flex-col max-w-4xl mx-auto"
    >
      {/* FIX: Removed mt-25. Added shrink-0 so the header never squishes */}
      <div className="mt-25 bg-surface-light dark:bg-surface-dark border border-border-subtle rounded-t-2xl p-4 flex items-center gap-3 shadow-sm z-10 relative shrink-0">
        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center border border-primary-200 dark:border-primary-800">
          <Bot className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h2 className="font-bold flex items-center gap-2">
            HireFlow AI <Sparkles className="w-3 h-3 text-primary-500" />
          </h2>
          <p className="text-xs text-text-muted">Always ready to help your career</p>
        </div>
      </div>

      {/* FIX: Added min-h-0 to ensure the scroll container doesn't overflow its parent */}
      <div className="flex-1 min-h-0 bg-surface-light/50 dark:bg-surface-dark/50 border-x border-border-subtle overflow-y-auto p-6 space-y-6">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-slate-200 dark:bg-slate-700' : 'bg-primary-100 dark:bg-primary-900 border border-primary-200 dark:border-primary-800'}`}>
                {msg.sender === 'user' ? <User className="w-4 h-4 text-slate-500 dark:text-slate-300" /> : <Bot className="w-4 h-4 text-primary-600 dark:text-primary-400" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-primary-600 text-white rounded-tr-sm' : 'bg-surface-light dark:bg-surface-dark border border-border-subtle shadow-sm rounded-tl-sm text-text-main'}`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 border border-primary-200 dark:border-primary-800 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="py-4 px-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-subtle shadow-sm rounded-tl-sm flex gap-1 items-center">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* FIX: Added shrink-0 to keep the input locked to the bottom */}
      <div className="bg-surface-light dark:bg-surface-dark border border-border-subtle rounded-b-2xl p-4 shadow-sm z-10 relative shrink-0">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about interview prep, resume writing..."
            className="w-full bg-background-light dark:bg-background-dark border border-border-subtle rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-primary-500 transition-colors text-sm text-text-main"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2 p-2 text-primary-500 hover:text-primary-600 disabled:opacity-50 disabled:hover:text-primary-500 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
