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
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4 transition-colors duration-300">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-800"
        >
          <div className="flex justify-center mb-6">
            <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2">Admin Access</h1>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-8">Enter the admin email to view user data.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin Email"
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors disabled:opacity-70"
            >
              {loading ? 'Verifying...' : 'Access Dashboard'}
            </button>
            <Link to="/" className="block text-center text-sm text-slate-500 hover:text-primary mt-4">
              Return to Home
            </Link>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">shield_person</span>
          </div>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="size-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">group</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Users</p>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{users.length}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="size-14 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">play_circle</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Videos</p>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{videos.length}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 font-bold transition-colors ${activeTab === 'users' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
          >
            Users ({users.length})
          </button>
          <button 
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2 font-bold transition-colors ${activeTab === 'videos' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
          >
            Videos ({videos.length})
          </button>
        </div>

        {activeTab === 'users' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400">
                    <th className="px-6 py-4 font-medium">User</th>
                    <th className="px-6 py-4 font-medium">Email</th>
                    <th className="px-6 py-4 font-medium">Coins</th>
                    <th className="px-6 py-4 font-medium">Streak</th>
                    <th className="px-6 py-4 font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0">
                            {user.profile_picture ? (
                              <img src={user.profile_picture} alt={user.username} className="w-full h-full object-cover" />
                            ) : (
                              <span className="material-symbols-outlined text-slate-400">person</span>
                            )}
                          </div>
                          <span className="font-medium">{user.username}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{user.email}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-amber-500 font-medium">
                          <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>toll</span>
                          {user.coins}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-orange-500 font-medium">
                          <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
                          {user.streak_count}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                        No users found in the database.
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
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-bold mb-4">{editingVideoId ? 'Edit Video' : 'Add New Video'}</h2>
              <form onSubmit={handleAddVideo} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Video Title" 
                  required 
                  value={newVideo.title}
                  onChange={e => setNewVideo({...newVideo, title: e.target.value})}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white"
                />
                <input 
                  type="text" 
                  placeholder="Category (e.g., React, Node.js)" 
                  required 
                  value={newVideo.category}
                  onChange={e => setNewVideo({...newVideo, category: e.target.value})}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white"
                />
                <input 
                  type="url" 
                  placeholder="Video URL (YouTube, MP4, etc.)" 
                  required 
                  value={newVideo.url}
                  onChange={e => setNewVideo({...newVideo, url: e.target.value})}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white"
                />
                <input 
                  type="text" 
                  placeholder="Duration (e.g., 10:24)" 
                  required 
                  value={newVideo.time}
                  onChange={e => setNewVideo({...newVideo, time: e.target.value})}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white"
                />
                <input 
                  type="url" 
                  placeholder="Thumbnail Image URL (Optional)" 
                  value={newVideo.image_url}
                  onChange={e => setNewVideo({...newVideo, image_url: e.target.value})}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white"
                />
                <div className="md:col-span-2 flex justify-end gap-3">
                  {editingVideoId && (
                    <button 
                      type="button" 
                      onClick={handleCancelEdit}
                      className="px-6 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  <button 
                    type="submit" 
                    disabled={videoLoading}
                    className="px-6 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors disabled:opacity-70"
                  >
                    {videoLoading ? (editingVideoId ? 'Updating...' : 'Adding...') : (editingVideoId ? 'Update Video' : 'Add Video')}
                  </button>
                </div>
              </form>
            </div>

            {/* Video List */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400">
                      <th className="px-6 py-4 font-medium">Image</th>
                      <th className="px-6 py-4 font-medium">Title</th>
                      <th className="px-6 py-4 font-medium">Category</th>
                      <th className="px-6 py-4 font-medium">Duration</th>
                      <th className="px-6 py-4 font-medium">URL</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {videos.map((video) => (
                      <tr key={video.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4">
                          {video.image_url ? (
                            <img src={video.image_url} alt={video.title} className="w-16 h-10 object-cover rounded" />
                          ) : (
                            <div className="w-16 h-10 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center">
                              <span className="material-symbols-outlined text-slate-400 text-sm">image</span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 font-medium">{video.title}</td>
                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-xs">{video.category}</span>
                        </td>
                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{video.time}</td>
                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm truncate max-w-[200px]">
                          <a href={video.url} target="_blank" rel="noreferrer" className="hover:text-primary underline">{video.url}</a>
                        </td>
                        <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleEditClick(video)}
                            className="text-indigo-500 hover:text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                            title="Edit Video"
                          >
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button 
                            onClick={() => handleDeleteVideo(video.id)}
                            className="text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            title="Delete Video"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {videos.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                          No videos found. Add one above!
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
