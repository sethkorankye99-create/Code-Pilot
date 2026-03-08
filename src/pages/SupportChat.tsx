import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { GoogleGenAI } from "@google/genai";
import { useAppContext } from '../context/AppContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'admin';
  timestamp: Date;
}

export default function SupportChat() {
  const { username } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello ${username}! I'm the Code Pillot support admin. How can I help you today?`,
      sender: 'admin',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Connect to the socket server
    socketRef.current = io();

    socketRef.current.on('chat message', (msg: any) => {
      // In a real multi-user app, we'd handle incoming messages here.
      // For this support chat, we're simulating the admin response via Gemini.
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Send to socket (optional for this demo, but follows real infra rules)
    socketRef.current?.emit('chat message', {
      text: inputValue,
      sender: username,
      type: 'support'
    });

    try {
      // Call Gemini to act as Admin
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: `You are the Customer Support Admin for "Code Pillot", an interactive coding platform. 
            The user's name is ${username}. 
            Be professional, helpful, and encouraging. 
            Respond to this message: "${inputValue}"` }]
          }
        ],
        config: {
          systemInstruction: "You are a helpful support admin for Code Pillot. Keep responses concise and friendly."
        }
      });

      const adminMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text || "I'm sorry, I'm having trouble connecting. Please try again later.",
        sender: 'admin',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, adminMsg]);
    } catch (error) {
      console.error("Gemini Error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm currently offline. Please try again in a moment.",
        sender: 'admin',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-background-light dark:bg-background-dark transition-colors duration-300 overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-card-dark z-10">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined">support_agent</span>
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 dark:text-white">Customer Support</h1>
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Admin Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-slate-100 dark:bg-slate-800/50 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
            Today
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
              <div className={`max-w-[80%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-medium">
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
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
              <div className="size-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></div>
              <div className="size-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="size-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-card-dark border-t border-slate-200 dark:border-slate-800">
        <form 
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 rounded-2xl p-1.5 border border-slate-200 dark:border-slate-800 focus-within:border-primary transition-colors"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-3 text-slate-900 dark:text-white placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="size-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
        <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 mt-3 font-medium">
          Typical response time: Under 1 minute
        </p>
      </div>
    </div>
  );
}
