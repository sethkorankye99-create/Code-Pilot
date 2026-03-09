import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  ChevronRight, 
  Clock, 
  User, 
  ArrowLeft,
  Filter,
  MoreVertical,
  ThumbsUp,
  Share2,
  Trash2
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAppContext } from '../context/AppContext';
import CoinDisplay from '../components/CoinDisplay';
import SettingsModal from '../components/SettingsModal';

interface ForumPost {
  id: string;
  user: string;
  avatar?: string | null;
  title: string;
  content: string;
  timestamp: number;
  category: string;
  likes: number;
  comment_count: number;
}

interface ForumComment {
  id: string;
  post_id: string;
  user: string;
  avatar?: string | null;
  text: string;
  timestamp: number;
}

export default function Forum() {
  const { username, profilePicture, showToast } = useAppContext();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  // New Post State
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('General');

  const categories = ['All', 'General', 'HTML', 'CSS', 'JavaScript', 'Python', 'Career', 'Showcase'];

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (username) {
      const storedLikes = JSON.parse(localStorage.getItem(`liked_posts_${username}`) || '[]');
      setLikedPosts(storedLikes);
    }
  }, [username]);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('forum_posts')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else if (data) {
      setPosts(data as ForumPost[]);
    }
    setLoading(false);
  };

  const fetchComments = async (postId: string) => {
    const { data, error } = await supabase
      .from('forum_comments')
      .select('*')
      .eq('post_id', postId)
      .order('timestamp', { ascending: true });

    if (error) {
      console.error('Error fetching comments:', error);
    } else if (data) {
      setComments(data as ForumComment[]);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      user: username,
      avatar: profilePicture,
      title: newPostTitle.trim(),
      content: newPostContent.trim(),
      timestamp: Date.now(),
      category: newPostCategory,
      likes: 0,
      comment_count: 0
    };

    const { error } = await supabase.from('forum_posts').insert([newPost]);

    if (error) {
      console.error('Error creating post:', error);
      showToast('Failed to create post', 'error');
    } else {
      setPosts([newPost as ForumPost, ...posts]);
      setIsCreateModalOpen(false);
      setNewPostTitle('');
      setNewPostContent('');
      showToast('Post created successfully!', 'success');
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !selectedPost) return;

    const comment = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      post_id: selectedPost.id,
      user: username,
      avatar: profilePicture,
      text: newComment.trim(),
      timestamp: Date.now()
    };

    const { error } = await supabase.from('forum_comments').insert([comment]);

    if (error) {
      console.error('Error adding comment:', error);
    } else {
      setComments([...comments, comment as ForumComment]);
      setNewComment('');
      
      // Update comment count in local state
      setPosts(posts.map(p => p.id === selectedPost.id ? { ...p, comment_count: p.comment_count + 1 } : p));
      setSelectedPost({ ...selectedPost, comment_count: selectedPost.comment_count + 1 });
      
      // Update comment count in Supabase
      await supabase
        .from('forum_posts')
        .update({ comment_count: selectedPost.comment_count + 1 })
        .eq('id', selectedPost.id);
    }
  };

  const handleLikePost = async (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const isLiked = likedPosts.includes(postId);
    const newLikes = isLiked ? Math.max(0, post.likes - 1) : post.likes + 1;
    
    // Update local state
    setPosts(posts.map(p => p.id === postId ? { ...p, likes: newLikes } : p));
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost({ ...selectedPost, likes: newLikes });
    }

    let newLikedPosts;
    if (isLiked) {
      newLikedPosts = likedPosts.filter(id => id !== postId);
    } else {
      newLikedPosts = [...likedPosts, postId];
    }
    setLikedPosts(newLikedPosts);
    localStorage.setItem(`liked_posts_${username}`, JSON.stringify(newLikedPosts));

    // Update Supabase
    const { error } = await supabase
      .from('forum_posts')
      .update({ likes: newLikes })
      .eq('id', postId);

    if (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handleDeletePost = async (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    
    // Confirm deletion
    if (!window.confirm("Are you sure you want to delete this discussion?")) return;

    // Delete from Supabase
    const { error } = await supabase
      .from('forum_posts')
      .delete()
      .eq('id', postId);

    if (error) {
      console.error('Error deleting post:', error);
      showToast('Failed to delete discussion', 'error');
    } else {
      // Update local state
      setPosts(posts.filter(p => p.id !== postId));
      if (selectedPost && selectedPost.id === postId) {
        setSelectedPost(null);
      }
      showToast('Discussion deleted successfully', 'success');
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark transition-colors duration-300 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center bg-background-light dark:bg-card-dark p-4 pb-2 justify-between border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <Link to="/community" className="flex size-12 shrink-0 items-center justify-start">
          <ArrowLeft className="text-slate-900 dark:text-slate-100" />
        </Link>
        <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight flex-1 text-center">Discussion Forum</h2>
        <div className="flex w-auto items-center justify-end gap-3">
          <CoinDisplay />
          <button onClick={() => setIsSettingsOpen(true)} className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-primary/10 text-primary overflow-hidden border border-primary/20">
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search discussions..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                activeCategory === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div className="flex-1 px-4 pb-32 space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Loading discussions...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="p-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
              <MessageSquare size={48} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No discussions found</h3>
              <p className="text-slate-500 dark:text-slate-400">Be the first to start a conversation!</p>
            </div>
          </div>
        ) : (
          filteredPosts.map(post => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => {
                setSelectedPost(post);
                fetchComments(post.id);
              }}
              className="bg-white dark:bg-card-dark p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:border-primary/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-full bg-primary/10 text-primary overflow-hidden border border-primary/20 flex items-center justify-center">
                  {post.avatar ? (
                    <img src={post.avatar} alt={post.user} className="w-full h-full object-cover" />
                  ) : (
                    <User size={18} />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{post.user}</p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    <span className="text-primary">{post.category}</span>
                    <span>•</span>
                    <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{post.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">{post.content}</p>
              
              <div className="flex items-center gap-6 pt-4 border-t border-slate-50 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <MessageSquare size={16} />
                  <span className="text-xs font-bold">{post.comment_count} Comments</span>
                </div>
                <button 
                  onClick={(e) => handleLikePost(e, post.id)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    likedPosts.includes(post.id) 
                      ? 'text-primary' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-primary'
                  }`}
                >
                  <ThumbsUp size={16} className={likedPosts.includes(post.id) ? 'fill-current' : ''} />
                  <span className="text-xs font-bold">{post.likes} Likes</span>
                </button>
                {post.user === username && (
                  <button 
                    onClick={(e) => handleDeletePost(e, post.id)}
                    className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors ml-auto"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsCreateModalOpen(true)}
        className="fixed bottom-24 right-6 size-14 rounded-full bg-primary text-white shadow-xl shadow-primary/30 flex items-center justify-center hover:scale-110 transition-transform z-40"
      >
        <Plus size={28} />
      </button>

      {/* Create Post Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-card-dark rounded-3xl p-6 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Start a Discussion</h3>
                <button onClick={() => setIsCreateModalOpen(false)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                  <Plus className="rotate-45" />
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Category</label>
                  <select 
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {categories.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Title</label>
                  <input 
                    type="text" 
                    placeholder="What's on your mind?" 
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Content</label>
                  <textarea 
                    placeholder="Share your thoughts, questions, or solutions..." 
                    rows={5}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={!newPostTitle.trim() || !newPostContent.trim()}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  Post Discussion
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Post Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="relative w-full max-w-2xl h-[90vh] sm:h-auto sm:max-h-[85vh] bg-background-light dark:bg-card-dark rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-card-dark">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-primary/10 text-primary overflow-hidden border border-primary/20 flex items-center justify-center">
                    {selectedPost.avatar ? (
                      <img src={selectedPost.avatar} alt={selectedPost.user} className="w-full h-full object-cover" />
                    ) : (
                      <User size={18} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedPost.user}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{selectedPost.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedPost.user === username && (
                    <button 
                      onClick={(e) => handleDeletePost(e, selectedPost.id)}
                      className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-colors"
                      title="Delete Discussion"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                  <button onClick={() => setSelectedPost(null)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                    <Plus className="rotate-45" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{selectedPost.title}</h3>
                  <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {selectedPost.content}
                  </div>
                </div>

                <div className="flex items-center gap-6 py-4 border-y border-slate-100 dark:border-slate-800">
                  <button 
                    onClick={(e) => handleLikePost(e, selectedPost.id)}
                    className={`flex items-center gap-2 transition-colors ${
                      likedPosts.includes(selectedPost.id)
                        ? 'text-primary'
                        : 'text-slate-500 dark:text-slate-400 hover:text-primary'
                    }`}
                  >
                    <ThumbsUp size={18} className={likedPosts.includes(selectedPost.id) ? 'fill-current' : ''} />
                    <span className="text-sm font-bold">{selectedPost.likes} Likes</span>
                  </button>
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <MessageSquare size={18} />
                    <span className="text-sm font-bold">{selectedPost.comment_count} Comments</span>
                  </div>
                  <button className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors ml-auto">
                    <Share2 size={18} />
                  </button>
                </div>

                {/* Comments Section */}
                <div className="space-y-6">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Comments</h4>
                  
                  {comments.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                      <p>No comments yet. Be the first to reply!</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {comments.map(comment => (
                        <div key={comment.id} className="flex gap-3">
                          <div className="size-8 rounded-full bg-primary/10 text-primary overflow-hidden border border-primary/20 flex items-center justify-center shrink-0">
                            {comment.avatar ? (
                              <img src={comment.avatar} alt={comment.user} className="w-full h-full object-cover" />
                            ) : (
                              <User size={14} />
                            )}
                          </div>
                          <div className="flex-1 bg-white dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold text-slate-900 dark:text-white">{comment.user}</span>
                              <span className="text-[10px] text-slate-400">{new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-300">{comment.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Comment Input */}
              <div className="p-4 bg-white dark:bg-card-dark border-t border-slate-200 dark:border-slate-800">
                <form onSubmit={handleAddComment} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Write a reply..." 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button 
                    type="submit"
                    disabled={!newComment.trim()}
                    className="size-11 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-50 transition-opacity"
                  >
                    <MessageSquare size={18} />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
