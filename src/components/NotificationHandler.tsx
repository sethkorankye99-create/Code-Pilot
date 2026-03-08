import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { useAppContext } from '../context/AppContext';

export default function NotificationHandler() {
  const { showToast, username, isLoggedIn } = useAppContext();
  const location = useLocation();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!isLoggedIn) return;

    // Connect to the socket server
    socketRef.current = io();

    socketRef.current.on('chat message', (msg: any) => {
      // Only notify if:
      // 1. It's a community message
      // 2. The message is not from the current user
      // 3. The user is not currently on the community page
      const isCommunityMsg = msg.type === 'community' || (msg.user && !msg.type);
      const sender = msg.user || msg.sender;

      if (isCommunityMsg && sender !== username && location.pathname !== '/community') {
        showToast(`New message from ${sender}: ${msg.text.substring(0, 30)}${msg.text.length > 30 ? '...' : ''}`, 'info');
      }
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [username, location.pathname, isLoggedIn, showToast]);

  return null;
}
