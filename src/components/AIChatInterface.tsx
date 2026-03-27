import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { useAppContext } from '../context/AppContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AIChatInterfaceProps {
  onClose?: () => void;
  isModal?: boolean;
}

export default function AIChatInterface({ onClose, isModal = false }: AIChatInterfaceProps) {
  const { username, deductCoin } = useAppContext();
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(`ai_tutor_history_${username}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      } catch (e) {
        console.error("Failed to parse chat history", e);
      }
    }
    return [
      {
        id: '1',
        text: `Hi ${username}! I'm your AI Programming Tutor. Ask me anything about coding, algorithms, or system design!`,
        sender: 'ai',
        timestamp: new Date()
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem(`ai_tutor_history_${username}`, JSON.stringify(messages));
  }, [messages, username]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    
    const result = await deductCoin();
    if (!result.success) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: currentInput,
        config: {
          systemInstruction: "You are an expert programming tutor. Provide clear, concise, and helpful explanations for coding questions. Use markdown for code blocks. Be encouraging and educational.",
        }
      });

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text || "I'm sorry, I couldn't process that. Could you rephrase your question?",
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("AI Tutor Error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having a bit of trouble thinking right now. Please check your connection or try again later.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`flex flex-col bg-slate-50 dark:bg-background-dark transition-colors duration-300 overflow-hidden relative ${isModal ? 'h-full rounded-2xl' : 'h-screen w-full'}`}>
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-card-dark/80 backdrop-blur-xl z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <span className="material-symbols-outlined">psychology</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 dark:text-white">AI Programming Tutor</h1>
            <div className="flex items-center gap-1.5">
              <div className="size-2 rounded-full bg-indigo-500 animate-pulse"></div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Powered by Gemini 3.1 Pro</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              if (confirm('Are you sure you want to clear the chat history?')) {
                setMessages([{
                  id: Date.now().toString(),
                  text: `Hi ${username}! I'm your AI Programming Tutor. Ask me anything about coding, algorithms, or system design!`,
                  sender: 'ai',
                  timestamp: new Date()
                }]);
              }
            }}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-all hover:-translate-y-0.5"
            title="Clear Chat"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
          {onClose && (
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-all hover:-translate-y-0.5"
              title="Close"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>
      </header>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/50">
            AI Assistant
          </div>
        </div>

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm backdrop-blur-sm ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-white rounded-tr-none shadow-primary/20' 
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 border border-slate-200/50 dark:border-slate-700/50 rounded-tl-none'
                }`}>
                  <div className="markdown-body prose dark:prose-invert max-w-none">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 font-medium px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1.5 items-center shadow-sm">
              <div className="size-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
              <div className="size-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="size-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/80 dark:bg-card-dark/80 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800/50 shrink-0 relative z-10">
        <form 
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl p-1.5 border border-slate-200/50 dark:border-slate-800/50 focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all backdrop-blur-sm"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a programming question..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-3 text-slate-900 dark:text-white placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="size-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/25 shrink-0 hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
        <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 mt-3 font-medium">
          AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}
