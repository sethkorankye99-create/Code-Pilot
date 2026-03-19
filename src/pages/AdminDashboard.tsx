import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface User {
  id: string;
  username: string;
  email: string;
  coins: number;
  streak_count: number;
  last_streak_date: string;
  created_at: string;
  profile_picture: string | null;
}

interface Video {
  id: number;
  title: string;
  category: string;
  url: string;
  time: string;
  image_url: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [email, setEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'users' | 'videos'>('users');

  const [newVideo, setNewVideo] = useState({ title: '', category: '', url: '', time: '', image_url: '' });
  const [videoLoading, setVideoLoading] = useState(false);
  const [editingVideoId, setEditingVideoId] = useState<number | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users', {
        headers: { 'x-admin-email': email.trim() }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos');
      if (response.ok) {
        const data = await response.json();
        setVideos(data.videos);
      }
    } catch (err) {
      console.error("Failed to fetch videos", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/admin/users', {
        headers: {
          'x-admin-email': email.trim()
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
        setIsAuthenticated(true);
        fetchVideos();
      } else {
        const errorData = await response.json().catch(() => null);
        if (response.status === 500 && errorData?.error) {
          setError(errorData.error);
        } else {
          setError('Access denied. Invalid admin email.');
        }
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setVideoLoading(true);
    try {
      if (editingVideoId) {
        const response = await fetch(`/api/admin/videos/${editingVideoId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-email': email.trim()
          },
          body: JSON.stringify(newVideo)
        });
        if (response.ok) {
          setNewVideo({ title: '', category: '', url: '', time: '', image_url: '' });
          setEditingVideoId(null);
          fetchVideos();
        } else {
          alert("Failed to update video.");
        }
      } else {
        const response = await fetch('/api/admin/videos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-email': email.trim()
          },
          body: JSON.stringify(newVideo)
        });
        if (response.ok) {
          setNewVideo({ title: '', category: '', url: '', time: '', image_url: '' });
          fetchVideos();
        } else {
          alert("Failed to add video.");
        }
      }
    } catch (err) {
      alert(`Error ${editingVideoId ? 'updating' : 'adding'} video.`);
    } finally {
      setVideoLoading(false);
    }
  };

  const handleEditClick = (video: Video) => {
    setEditingVideoId(video.id);
    setNewVideo({
      title: video.title,
      category: video.category,
      url: video.url,
      time: video.time,
      image_url: video.image_url || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingVideoId(null);
    setNewVideo({ title: '', category: '', url: '', time: '', image_url: '' });
  };

  const handleDeleteVideo = async (id: number) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    try {
      const response = await fetch(`/api/admin/videos/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-email': email.trim() }
      });
      if (response.ok) {
        fetchVideos();
      } else {
        alert("Failed to delete video.");
      }
    } catch (err) {
      alert("Error deleting video.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] flex items-center justify-center p-4 transition-colors duration-300 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-500/5 blur-[120px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-slate-200/50 dark:border-slate-800/50 relative z-10"
        >
          <div className="flex justify-center mb-6">
            <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
              <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2 tracking-tight">Admin Access</h1>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-8 text-sm">Enter the admin email to view user data.</p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin Email"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 focus:ring-2 focus:ring-primary/50 focus:border-primary text-slate-900 dark:text-white shadow-inner transition-all outline-none"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-500/10 py-2 rounded-lg border border-red-100 dark:border-red-500/20">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-primary text-white font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {loading ? 'Verifying...' : 'Access Dashboard'}
            </button>
            <Link to="/" className="block text-center text-sm text-slate-500 hover:text-primary mt-4 transition-colors">
              Return to Home
            </Link>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-white transition-colors duration-300 pb-24">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link to="/" className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors mr-2">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shadow-inner">
            <span className="material-symbols-outlined">shield_person</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium flex items-center gap-2 text-slate-700 dark:text-slate-300"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-3xl">group</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Total Users</p>
              <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{users.length}</p>
            </div>
          </div>
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="size-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-3xl">play_circle</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Total Videos</p>
              <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{videos.length}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-200/50 dark:border-slate-800/50 pb-2">
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${activeTab === 'users' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}
          >
            Users ({users.length})
          </button>
          <button 
            onClick={() => setActiveTab('videos')}
            className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${activeTab === 'videos' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}
          >
            Videos ({videos.length})
          </button>
        </div>

        {activeTab === 'users' && (
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200/50 dark:border-slate-800/50 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Coins</th>
                    <th className="px-6 py-4">Streak</th>
                    <th className="px-6 py-4">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/50">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center border border-slate-200/50 dark:border-slate-700/50 shrink-0">
                            {user.profile_picture ? (
                              <img src={user.profile_picture} alt={user.username} className="w-full h-full object-cover" />
                            ) : (
                              <span className="material-symbols-outlined text-slate-400">person</span>
                            )}
                          </div>
                          <span className="font-medium text-slate-900 dark:text-white">{user.username}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">{user.email}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-amber-500 font-semibold bg-amber-50 dark:bg-amber-500/10 w-fit px-2.5 py-1 rounded-lg border border-amber-100 dark:border-amber-500/20">
                          <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>toll</span>
                          {user.coins}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-orange-500 font-semibold bg-orange-50 dark:bg-orange-500/10 w-fit px-2.5 py-1 rounded-lg border border-orange-100 dark:border-orange-500/20">
                          <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
                          {user.streak_count}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">
                        {new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                        <div className="flex flex-col items-center justify-center">
                          <span className="material-symbols-outlined text-4xl mb-2 opacity-50">group_off</span>
                          <p>No users found in the database.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="space-y-6">
            {/* Add/Edit Video Form */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-800/50 p-6">
              <h2 className="text-lg font-bold mb-4 tracking-tight">{editingVideoId ? 'Edit Video' : 'Add New Video'}</h2>
              <form onSubmit={handleAddVideo} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Video Title" 
                  required 
                  value={newVideo.title}
                  onChange={e => setNewVideo({...newVideo, title: e.target.value})}
                  className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 focus:ring-2 focus:ring-primary/50 focus:border-primary text-slate-900 dark:text-white shadow-inner transition-all outline-none"
                />
                <input 
                  type="text" 
                  placeholder="Category (e.g., React, Node.js)" 
                  required 
                  value={newVideo.category}
                  onChange={e => setNewVideo({...newVideo, category: e.target.value})}
                  className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 focus:ring-2 focus:ring-primary/50 focus:border-primary text-slate-900 dark:text-white shadow-inner transition-all outline-none"
                />
                <input 
                  type="url" 
                  placeholder="Video URL (YouTube, MP4, etc.)" 
                  required 
                  value={newVideo.url}
                  onChange={e => setNewVideo({...newVideo, url: e.target.value})}
                  className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 focus:ring-2 focus:ring-primary/50 focus:border-primary text-slate-900 dark:text-white shadow-inner transition-all outline-none"
                />
                <input 
                  type="text" 
                  placeholder="Duration (e.g., 10:24)" 
                  required 
                  value={newVideo.time}
                  onChange={e => setNewVideo({...newVideo, time: e.target.value})}
                  className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 focus:ring-2 focus:ring-primary/50 focus:border-primary text-slate-900 dark:text-white shadow-inner transition-all outline-none"
                />
                <input 
                  type="url" 
                  placeholder="Thumbnail Image URL (Optional)" 
                  value={newVideo.image_url}
                  onChange={e => setNewVideo({...newVideo, image_url: e.target.value})}
                  className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 focus:ring-2 focus:ring-primary/50 focus:border-primary text-slate-900 dark:text-white shadow-inner transition-all outline-none md:col-span-2"
                />
                <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                  {editingVideoId && (
                    <button 
                      type="button" 
                      onClick={handleCancelEdit}
                      className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  <button 
                    type="submit" 
                    disabled={videoLoading}
                    className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  >
                    {videoLoading ? (editingVideoId ? 'Updating...' : 'Adding...') : (editingVideoId ? 'Update Video' : 'Add Video')}
                  </button>
                </div>
              </form>
            </div>

            {/* Video List */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200/50 dark:border-slate-800/50 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                      <th className="px-6 py-4">Image</th>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Duration</th>
                      <th className="px-6 py-4">URL</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/50">
                    {videos.map((video) => (
                      <tr key={video.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4">
                          {video.image_url ? (
                            <img src={video.image_url} alt={video.title} className="w-16 h-10 object-cover rounded-lg border border-slate-200/50 dark:border-slate-700/50 shadow-sm" />
                          ) : (
                            <div className="w-16 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border border-slate-200/50 dark:border-slate-700/50">
                              <span className="material-symbols-outlined text-slate-400 text-sm">image</span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{video.title}</td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300">{video.category}</span>
                        </td>
                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">{video.time}</td>
                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm truncate max-w-[200px]">
                          <a href={video.url} target="_blank" rel="noreferrer" className="hover:text-primary underline transition-colors">{video.url}</a>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleEditClick(video)}
                              className="text-indigo-500 hover:text-indigo-600 p-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                              title="Edit Video"
                            >
                              <span className="material-symbols-outlined text-sm">edit</span>
                            </button>
                            <button 
                              onClick={() => handleDeleteVideo(video.id)}
                              className="text-red-500 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                              title="Delete Video"
                            >
                              <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {videos.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                          <div className="flex flex-col items-center justify-center">
                            <span className="material-symbols-outlined text-4xl mb-2 opacity-50">videocam_off</span>
                            <p>No videos found. Add one above!</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
