import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { supabase } from '../lib/supabase';
import { MessageSquare, Send, ArrowLeft, MoreVertical, Search, Check, CheckCheck, User } from 'lucide-react';

interface Profile {
  id: string;
  username: string;
  avatar_url: string | null;
}

interface Conversation {
  id: string;
  created_at: string;
  updated_at: string;
  last_message?: Message;
  other_participant: Profile;
  unread_count: number;
}

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export default function Messages() {
  const { userId, username, profilePicture, showToast } = useAppContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const targetUserId = searchParams.get('user');

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Fetch Conversations
  const fetchConversations = async () => {
    if (!userId) return;
    
    try {
      // Fetch conversations where the user is a participant
      const { data: participants, error: pError } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', userId);

      if (pError) throw pError;

      if (!participants || participants.length === 0) {
        setConversations([]);
        setIsLoading(false);
        return;
      }

      const conversationIds = participants.map(p => p.conversation_id);

      // Fetch conversation details and other participants
      const { data: convs, error: cError } = await supabase
        .from('conversations')
        .select(`
          *,
          conversation_participants!inner(user_id, profiles!inner(id, username, avatar_url)),
          messages(id, content, created_at, sender_id, is_read)
        `)
        .in('id', conversationIds)
        .order('updated_at', { ascending: false });

      if (cError) throw cError;

      const formattedConvs = convs.map((c: any) => {
        const otherParticipant = c.conversation_participants.find((p: any) => p.user_id !== userId)?.profiles;
        const lastMessage = c.messages.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
        const unreadCount = c.messages.filter((m: any) => m.sender_id !== userId && !m.is_read).length;

        return {
          ...c,
          other_participant: otherParticipant,
          last_message: lastMessage,
          unread_count: unreadCount
        };
      });

      setConversations(formattedConvs);
    } catch (err) {
      console.error('Error fetching conversations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Fetch or Create Conversation with a specific user
  const startConversation = async (otherId: string) => {
    if (!userId || userId === otherId) return;
    setIsChatLoading(true);

    try {
      // Check if conversation already exists
      const { data: existing, error: eError } = await supabase
        .rpc('get_conversation_between_users', { user1: userId, user2: otherId });

      if (eError) throw eError;

      let conversationId;

      if (existing && existing.length > 0) {
        conversationId = existing[0].id;
      } else {
        // Create new conversation
        const { data: newConv, error: nError } = await supabase
          .from('conversations')
          .insert({})
          .select()
          .single();

        if (nError) throw nError;
        conversationId = newConv.id;

        // Add participants
        await supabase.from('conversation_participants').insert([
          { conversation_id: conversationId, user_id: userId },
          { conversation_id: conversationId, user_id: otherId }
        ]);
      }

      // Fetch the full conversation object
      await fetchConversations();
      const conv = conversations.find(c => c.id === conversationId);
      if (conv) setActiveConversation(conv);
      else {
        // If not found in current list, fetch it specifically
        const { data: freshConv } = await supabase
          .from('conversations')
          .select(`
            *,
            conversation_participants!inner(user_id, profiles!inner(id, username, avatar_url))
          `)
          .eq('id', conversationId)
          .single();
        
        if (freshConv) {
          const otherParticipant = (freshConv as any).conversation_participants.find((p: any) => p.user_id !== userId)?.profiles;
          setActiveConversation({
            ...freshConv,
            other_participant: otherParticipant,
            unread_count: 0
          } as Conversation);
        }
      }
    } catch (err) {
      console.error('Error starting conversation:', err);
      showToast('Failed to start conversation', 'error');
    } finally {
      setIsChatLoading(false);
    }
  };

  // 3. Fetch Messages for active conversation
  const fetchMessages = async (convId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', convId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);

      // Mark as read
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('conversation_id', convId)
        .neq('sender_id', userId)
        .eq('is_read', false);
      
      // Update local unread count
      setConversations(prev => prev.map(c => c.id === convId ? { ...c, unread_count: 0 } : c));
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  // 4. Send Message
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newMessage.trim() || !activeConversation || !userId) return;

    const content = newMessage.trim();
    setNewMessage('');

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: activeConversation.id,
          sender_id: userId,
          content: content
        })
        .select()
        .single();

      if (error) throw error;

      // Update conversation timestamp
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', activeConversation.id);

      // Messages will be updated via real-time subscription
    } catch (err) {
      console.error('Error sending message:', err);
      showToast('Failed to send message', 'error');
    }
  };

  // 5. Real-time Subscriptions
  useEffect(() => {
    if (!userId) return;

    // Subscribe to messages
    const messageSub = supabase
      .channel('messages-channel')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages' 
      }, (payload) => {
        const newMsg = payload.new as Message;
        
        // If it's for the active conversation, add it
        if (activeConversation && newMsg.conversation_id === activeConversation.id) {
          setMessages(prev => [...prev, newMsg]);
          // Mark as read if we are looking at it
          if (newMsg.sender_id !== userId) {
            supabase.from('messages').update({ is_read: true }).eq('id', newMsg.id);
          }
        }

        // Update conversation list last message
        setConversations(prev => {
          const updated = prev.map(c => {
            if (c.id === newMsg.conversation_id) {
              return {
                ...c,
                last_message: newMsg,
                updated_at: newMsg.created_at,
                unread_count: (newMsg.sender_id !== userId && (!activeConversation || activeConversation.id !== c.id)) 
                  ? c.unread_count + 1 
                  : c.unread_count
              };
            }
            return c;
          });
          return updated.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(messageSub);
    };
  }, [userId, activeConversation]);

  // Initial load
  useEffect(() => {
    fetchConversations();
  }, [userId]);

  // Handle target user from URL
  useEffect(() => {
    if (targetUserId && !isLoading) {
      startConversation(targetUserId);
    }
  }, [targetUserId, isLoading]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelectConversation = (conv: Conversation) => {
    setActiveConversation(conv);
    fetchMessages(conv.id);
    if (window.innerWidth < 768) {
      // On mobile, we might want to hide the list
    }
  };

  const filteredConversations = conversations.filter(c => 
    c.other_participant.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-background-dark flex items-center justify-center">
        <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-background-dark overflow-hidden transition-colors duration-300">
      {/* Sidebar - Conversation List */}
      <aside className={`w-full md:w-80 lg:w-96 border-r border-slate-200 dark:border-white/10 flex flex-col bg-white dark:bg-card-dark transition-all duration-300 ${activeConversation ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Messages</h1>
            </div>
            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-white/5 border border-transparent focus:border-primary/50 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center text-slate-500 dark:text-slate-400 mt-10">
              <div className="size-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                <MessageSquare size={32} className="opacity-20" />
              </div>
              <p className="text-sm font-medium">No conversations found</p>
              <p className="text-xs mt-1">Start a chat from the community!</p>
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => handleSelectConversation(conv)}
                className={`w-full p-4 flex gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border-b border-slate-100 dark:border-white/5 text-left ${activeConversation?.id === conv.id ? 'bg-primary/5 dark:bg-primary/10' : ''}`}
              >
                <div className="relative flex-shrink-0">
                  <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center overflow-hidden border border-primary/20">
                    {conv.other_participant.avatar_url ? (
                      <img src={conv.other_participant.avatar_url} alt={conv.other_participant.username} className="w-full h-full object-cover" />
                    ) : (
                      <User size={24} />
                    )}
                  </div>
                  <div className="absolute bottom-0 right-0 size-3 bg-emerald-500 border-2 border-white dark:border-card-dark rounded-full"></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-900 dark:text-white truncate">{conv.other_participant.username}</h3>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {conv.last_message ? new Date(conv.last_message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className={`text-xs truncate ${conv.unread_count > 0 ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
                      {conv.last_message?.sender_id === userId ? 'You: ' : ''}
                      {conv.last_message?.content || 'No messages yet'}
                    </p>
                    {conv.unread_count > 0 && (
                      <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                        {conv.unread_count}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className={`flex-1 flex flex-col bg-white dark:bg-[#050505] transition-all duration-300 ${!activeConversation ? 'hidden md:flex' : 'flex'}`}>
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <header className="h-16 border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-4 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl z-10">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setActiveConversation(null)}
                  className="md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center overflow-hidden border border-primary/20">
                  {activeConversation.other_participant.avatar_url ? (
                    <img src={activeConversation.other_participant.avatar_url} alt={activeConversation.other_participant.username} className="w-full h-full object-cover" />
                  ) : (
                    <User size={20} />
                  )}
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 dark:text-white leading-tight">{activeConversation.other_participant.username}</h2>
                  <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30 dark:bg-transparent">
              {messages.map((msg, index) => {
                const isMe = msg.sender_id === userId;
                const showDate = index === 0 || new Date(msg.created_at).toDateString() !== new Date(messages[index-1].created_at).toDateString();
                
                return (
                  <React.Fragment key={msg.id}>
                    {showDate && (
                      <div className="flex justify-center my-6">
                        <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          {new Date(msg.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    )}
                    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] md:max-w-[60%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                        <div className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm transition-all ${
                          isMe 
                            ? 'bg-primary text-white rounded-tr-none' 
                            : 'bg-white dark:bg-card-dark text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-white/10 rounded-tl-none'
                        }`}>
                          {msg.content}
                        </div>
                        <div className="flex items-center gap-1 mt-1 px-1">
                          <span className="text-[10px] text-slate-400 font-medium">
                            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {isMe && (
                            msg.is_read ? <CheckCheck size={12} className="text-primary" /> : <Check size={12} className="text-slate-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <footer className="p-4 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a]">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3 max-w-4xl mx-auto">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-primary/50 rounded-2xl px-5 py-3 text-sm focus:outline-none transition-all"
                />
                <button 
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="size-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  <Send size={20} />
                </button>
              </form>
            </footer>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/50 dark:bg-transparent">
            <div className="size-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary animate-pulse">
              <MessageSquare size={48} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Your Messages</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
              Select a conversation from the list or start a new one from the community chat.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
