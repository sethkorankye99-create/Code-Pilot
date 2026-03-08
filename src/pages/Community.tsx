import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { useAppContext } from '../context/AppContext';
import SettingsModal from '../components/SettingsModal';
import CoinDisplay from '../components/CoinDisplay';
import { supabase } from '../lib/supabase';
import { MessageSquare } from 'lucide-react';

interface ChatMessage {
  id: string;
  user: string;
  avatar?: string | null;
  text: string;
  timestamp: number;
  type?: 'community';
}

interface MenuPosition {
  x: number;
  y: number;
}

export default function Community() {
  const { username, profilePicture } = useAppContext();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = () => setMenuPosition(null);
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleClickOutside, true);
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    // Fetch initial messages from Supabase
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('community_messages')
        .select('*')
        .order('timestamp', { ascending: true })
        .limit(100);

      if (error) {
        console.error('Error fetching messages:', error);
      } else if (data) {
        setMessages(data as ChatMessage[]);
      }
    };

    fetchMessages();

    // Connect to the socket server
    socketRef.current = io();

    socketRef.current.on('chat message', (msg: ChatMessage) => {
      setMessages((prev) => {
        // Prevent duplicate messages if they were already fetched or received
        if (prev.some(m => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
    });

    // Listen for deletions
    socketRef.current.on('delete message', (id: string) => {
      setMessages((prev) => prev.filter(m => m.id !== id));
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !socketRef.current) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      user: username,
      avatar: profilePicture,
      text: inputValue.trim(),
      timestamp: Date.now(),
      type: 'community',
    };

    // Optimistically add to local state
    setMessages((prev) => [...prev, newMsg]);
    setInputValue('');

    // Store in Supabase
    const { error } = await supabase
      .from('community_messages')
      .insert([newMsg]);

    if (error) {
      console.error('Error storing message:', error);
      // Optional: remove from local state if failed
    }

    // Broadcast via Socket.IO
    socketRef.current.emit('chat message', newMsg);
  };

  const showMenu = (e: React.MouseEvent | React.TouchEvent, msg: ChatMessage) => {
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    
    setMenuPosition({ x: clientX, y: clientY });
    setSelectedMessage(msg);
  };

  const handleContextMenu = (e: React.MouseEvent, msg: ChatMessage) => {
    showMenu(e, msg);
  };

  const handleDoubleClick = (e: React.MouseEvent, msg: ChatMessage) => {
    showMenu(e, msg);
  };

  const handleTouchStart = (e: React.TouchEvent, msg: ChatMessage) => {
    longPressTimer.current = setTimeout(() => {
      showMenu(e, msg);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleDelete = async () => {
    if (!selectedMessage || !socketRef.current) return;
    // In a real app, we would check user_id matches current session
    if (selectedMessage.user === username) {
      // Delete from Supabase
      const { error } = await supabase
        .from('community_messages')
        .delete()
        .eq('id', selectedMessage.id);

      if (error) {
        console.error('Error deleting message:', error);
      }

      socketRef.current.emit('delete message', selectedMessage.id);
      setMessages(prev => prev.filter(m => m.id !== selectedMessage.id));
    } else {
      alert("You can only delete your own messages.");
    }
    setMenuPosition(null);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark transition-colors duration-300 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center bg-background-light dark:bg-card-dark p-4 pb-2 justify-between border-b border-slate-200 dark:border-slate-800">
        <Link to="/dashboard" className="flex size-12 shrink-0 items-center justify-start">
          <span className="material-symbols-outlined text-slate-900 dark:text-slate-100 cursor-pointer">arrow_back</span>
        </Link>
        <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight flex-1 text-center">Community Chat</h2>
        <div className="flex w-auto items-center justify-end gap-3">
          <Link to="/forum" className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors">
            <MessageSquare size={20} />
          </Link>
          <CoinDisplay />
          <button onClick={() => setIsSettingsOpen(true)} className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-primary/10 text-primary overflow-hidden border border-primary/20">
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined">account_circle</span>
            )}
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden pb-24">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400 space-y-2">
              <span className="material-symbols-outlined text-4xl opacity-50">forum</span>
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = msg.user === username;
              return (
                <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className="flex-shrink-0 mt-1">
                    <div className="size-8 rounded-full bg-primary/10 text-primary overflow-hidden border border-primary/20 flex items-center justify-center">
                      {msg.avatar ? (
                        <img src={msg.avatar} alt={msg.user} className="w-full h-full object-cover" />
                      ) : (
                        <span className="material-symbols-outlined text-lg">account_circle</span>
                      )}
                    </div>
                  </div>

                  <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[80%]`}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{msg.user}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div 
                      onContextMenu={(e) => handleContextMenu(e, msg)}
                      onDoubleClick={(e) => handleDoubleClick(e, msg)}
                      onTouchStart={(e) => handleTouchStart(e, msg)}
                      onTouchEnd={handleTouchEnd}
                      className={`px-4 py-2 rounded-2xl break-words cursor-pointer transition-all shadow-sm ${
                        isMe 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Context Menu */}
        {menuPosition && (
          <div 
            className="fixed z-[100] bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 min-w-[160px] animate-in fade-in zoom-in duration-100"
            style={{ 
              top: Math.min(menuPosition.y, window.innerHeight - 100), 
              left: Math.min(menuPosition.x, window.innerWidth - 180) 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleDelete}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">delete</span>
              <span>Delete</span>
            </button>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button 
              type="submit" 
              disabled={!inputValue.trim()}
              className="flex items-center justify-center size-12 rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>send</span>
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 flex border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-card-dark px-4 pb-6 pt-3 z-50">
        <Link to="/dashboard" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">menu_book</span>
          <p className="text-[10px] font-bold uppercase tracking-wider">Courses</p>
        </Link>
        <Link to="/explore" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">search</span>
          <p className="text-[10px] font-bold uppercase tracking-wider">Explore</p>
        </Link>
        <Link to="/community" className="flex flex-1 flex-col items-center justify-center gap-1 text-primary">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>group</span>
          <p className="text-[10px] font-bold uppercase tracking-wider">Community</p>
        </Link>
        <button onClick={() => setIsSettingsOpen(true)} className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">person</span>
          <p className="text-[10px] font-bold uppercase tracking-wider">Profile</p>
        </button>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
