import express from "express";
import { createServer as createViteServer } from "vite";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize SQLite database
const db = new Database('app.db');

// Create users table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT,
    coins INTEGER DEFAULT 5,
    last_reset_date TEXT,
    streak_count INTEGER DEFAULT 0,
    last_streak_date TEXT,
    profile_picture TEXT
  )
`);

// Helper to get current server date string (YYYY-MM-DD)
const getCurrentDateStr = () => {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-${String(now.getUTCDate()).padStart(2, '0')}`;
};

// Helper to get yesterday's date string (YYYY-MM-DD)
const getYesterdayDateStr = () => {
  const yesterday = new Date();
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  return `${yesterday.getUTCFullYear()}-${String(yesterday.getUTCMonth() + 1).padStart(2, '0')}-${String(yesterday.getUTCDate()).padStart(2, '0')}`;
};

// Ensure a default user exists (legacy support or guest mode)
const ensureDefaultUser = () => {
  const userId = 'default_user';
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  let user = stmt.get(userId) as any;
  
  const today = getCurrentDateStr();
  const yesterday = getYesterdayDateStr();

  if (!user) {
    db.prepare('INSERT INTO users (id, username, password, coins, last_reset_date, streak_count, last_streak_date, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').run(userId, 'Guest', 'guest', 5, today, 0, '', null);
    user = { id: userId, username: 'Guest', coins: 5, last_reset_date: today, streak_count: 0, last_streak_date: '', profile_picture: null };
  } else {
    // Reset coins if it's a new day
    if (user.last_reset_date !== today) {
      db.prepare('UPDATE users SET coins = 5, last_reset_date = ? WHERE id = ?').run(today, userId);
      user.coins = 5;
      user.last_reset_date = today;
    }
    
    // Check if streak should be reset (if last streak was before yesterday)
    if (user.last_streak_date && user.last_streak_date !== today && user.last_streak_date !== yesterday) {
      db.prepare('UPDATE users SET streak_count = 0 WHERE id = ?').run(userId);
      user.streak_count = 0;
    }
  }
  
  return user;
};

async function startServer() {
  const app = express();
  const PORT = 3000;
  const httpServer = createServer(app);
  
  app.use(express.json());

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Auth API routes
  app.post("/api/auth/signup", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    try {
      const id = Date.now().toString();
      const today = getCurrentDateStr();
      db.prepare('INSERT INTO users (id, username, password, coins, last_reset_date, streak_count, last_streak_date, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').run(id, username, password, 5, today, 0, '', null);
      res.json({ success: true, user: { id, username, coins: 5, streak_count: 0, profile_picture: null } });
    } catch (err: any) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: "Username already exists" });
      }
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.post("/api/auth/login", (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?').get(username, password) as any;

    if (user) {
      const today = getCurrentDateStr();
      const yesterday = getYesterdayDateStr();
      
      if (user.last_reset_date !== today) {
        db.prepare('UPDATE users SET coins = 5, last_reset_date = ? WHERE id = ?').run(today, user.id);
        user.coins = 5;
      }

      // Check streak reset on login
      if (user.last_streak_date && user.last_streak_date !== today && user.last_streak_date !== yesterday) {
        db.prepare('UPDATE users SET streak_count = 0 WHERE id = ?').run(user.id);
        user.streak_count = 0;
      }

      res.json({ success: true, user: { id: user.id, username: user.username, coins: user.coins, streak_count: user.streak_count, profile_picture: user.profile_picture } });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Coin API routes
  app.get("/api/coins", (req, res) => {
    const userId = req.query.userId as string;
    let user;
    if (userId) {
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId) as any;
    }
    
    if (!user) {
      user = ensureDefaultUser();
    }
    
    res.json({ coins: user.coins, streak_count: user.streak_count, profile_picture: user.profile_picture });
  });

  app.post("/api/coins/deduct", (req, res) => {
    const { userId } = req.body;
    let user;
    if (userId) {
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId) as any;
    }

    if (!user) {
      user = ensureDefaultUser();
    }
    
    if (user.coins <= 0) {
      return res.status(400).json({ error: "No coins left", coins: 0 });
    }
    
    const newCoins = user.coins - 1;
    db.prepare('UPDATE users SET coins = ? WHERE id = ?').run(newCoins, user.id);
    
    res.json({ success: true, coins: newCoins, streak_count: user.streak_count, profile_picture: user.profile_picture });
  });

  app.post("/api/streak/update", (req, res) => {
    const { userId } = req.body;
    let user;
    if (userId) {
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId) as any;
    }

    if (!user) {
      user = ensureDefaultUser();
    }

    const today = getCurrentDateStr();
    const yesterday = getYesterdayDateStr();

    let newStreak = user.streak_count;

    if (user.last_streak_date === today) {
      // Already updated today, no change
    } else if (user.last_streak_date === yesterday) {
      // Continued streak
      newStreak += 1;
      db.prepare('UPDATE users SET streak_count = ?, last_streak_date = ? WHERE id = ?').run(newStreak, today, user.id);
    } else {
      // New streak or reset
      newStreak = 1;
      db.prepare('UPDATE users SET streak_count = ?, last_streak_date = ? WHERE id = ?').run(newStreak, today, user.id);
    }

    res.json({ success: true, streak_count: newStreak });
  });

  // Socket.IO logic
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("chat message", (msg) => {
      // Broadcast to all clients
      io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  app.post("/api/profile/picture", (req, res) => {
    const { userId, profilePicture } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "User ID required" });
    }
    try {
      db.prepare('UPDATE users SET profile_picture = ? WHERE id = ?').run(profilePicture, userId);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Failed to update profile picture" });
    }
  });

  app.get("/api/admin/users", (req, res) => {
    const adminPassword = req.headers['x-admin-password'];
    // In production, use process.env.ADMIN_PASSWORD. For this demo, we use a hardcoded fallback.
    const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";
    
    if (adminPassword !== expectedPassword) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const users = db.prepare('SELECT id, username, email, coins, streak_count, last_streak_date, created_at, profile_picture FROM users ORDER BY created_at DESC').all();
      res.json({ success: true, users });
    } catch (err) {
      res.status(500).json({ error: "Database error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
