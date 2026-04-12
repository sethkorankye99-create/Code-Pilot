import express from "express";
import { createServer as createViteServer } from "vite";
import { createServer } from "http";
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
    profile_picture TEXT,
    email TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS course_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    course_id TEXT,
    module_id TEXT,
    is_completed BOOLEAN DEFAULT 0,
    quiz_score INTEGER DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES users(id),
    UNIQUE(user_id, course_id, module_id)
  );

  CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    url TEXT NOT NULL,
    time TEXT NOT NULL,
    image_url TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

// Add columns for existing databases
try { db.exec("ALTER TABLE users ADD COLUMN email TEXT"); } catch (e) {}
try { db.exec("ALTER TABLE users ADD COLUMN created_at TEXT DEFAULT CURRENT_TIMESTAMP"); } catch (e) {}
try { db.exec("ALTER TABLE users ADD COLUMN profile_picture TEXT"); } catch (e) {}
try { db.exec("ALTER TABLE videos ADD COLUMN image_url TEXT"); } catch (e) {}

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

async function startServer() {
  const app = express();
  const PORT = 3000;
  const httpServer = createServer(app);
  
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

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
      db.prepare('INSERT INTO users (id, username, password, coins, last_reset_date, streak_count, last_streak_date, profile_picture, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)').run(id, username, password, 5, today, 0, '', null, username);
      res.json({ success: true, user: { id, username, coins: 5, streak_count: 0, profile_picture: null } });
    } catch (err: any) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: "Username already exists" });
      }
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.post("/api/auth/sync", (req, res) => {
    const { id, email } = req.body;
    if (!id || !email) {
      return res.status(400).json({ error: "ID and email required" });
    }

    try {
      let user = db.prepare('SELECT * FROM users WHERE id = ?').get(id) as any;
      
      if (!user) {
        const today = getCurrentDateStr();
        db.prepare('INSERT INTO users (id, username, password, coins, last_reset_date, streak_count, last_streak_date, profile_picture, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)').run(id, email, '', 5, today, 0, '', null, email);
        user = { id, username: email, coins: 5, streak_count: 0, profile_picture: null };
      } else {
        // Check if coins need reset (daily)
        const today = getCurrentDateStr();
        if (user.last_reset_date !== today) {
          db.prepare('UPDATE users SET coins = coins + 5, last_reset_date = ? WHERE id = ?').run(today, id);
          user.coins += 5;
        }
      }

      res.json({ 
        success: true, 
        user: { 
          id: user.id, 
          username: user.username, 
          coins: user.coins, 
          streak_count: user.streak_count,
          profile_picture: user.profile_picture
        } 
      });
    } catch (err: any) {
      console.error("Sync error:", err);
      res.status(500).json({ error: "Failed to sync user" });
    }
  });

  app.post("/api/auth/login", (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?').get(username, password) as any;

    if (user) {
      const today = getCurrentDateStr();
      const yesterday = getYesterdayDateStr();
      
      if (user.last_reset_date !== today) {
        db.prepare('UPDATE users SET coins = coins + 5, last_reset_date = ? WHERE id = ?').run(today, user.id);
        user.coins += 5;
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
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User ID required" });
    }
    
    let user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId) as any;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json({ coins: user.coins, streak_count: user.streak_count, profile_picture: user.profile_picture });
  });

  app.post("/api/coins/deduct", (req, res) => {
    const { userId } = req.body;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User ID required" });
    }
    
    let user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId) as any;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
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
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User ID required" });
    }
    
    let user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId) as any;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
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

  // Course Progress API routes
  app.get("/api/progress", (req, res) => {
    const userId = req.query.userId as string;
    const courseId = req.query.courseId as string;
    
    if (!userId || !courseId) {
      return res.status(400).json({ error: "User ID and Course ID required" });
    }
    
    try {
      const progress = db.prepare('SELECT * FROM course_progress WHERE user_id = ? AND course_id = ?').all(userId, courseId);
      res.json({ success: true, progress });
    } catch (err) {
      res.status(500).json({ error: "Database error" });
    }
  });

  app.post("/api/progress/update", (req, res) => {
    const { userId, courseId, moduleId, isCompleted, quizScore } = req.body;
    
    if (!userId || !courseId || !moduleId) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    try {
      db.prepare(`
        INSERT INTO course_progress (user_id, course_id, module_id, is_completed, quiz_score)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(user_id, course_id, module_id) DO UPDATE SET
          is_completed = excluded.is_completed,
          quiz_score = excluded.quiz_score
      `).run(userId, courseId, moduleId, isCompleted ? 1 : 0, quizScore || 0);
      
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Failed to update progress" });
    }
  });

  app.post("/api/coins/add", (req, res) => {
    const { userId, amount } = req.body;
    if (!userId || !amount) {
      return res.status(400).json({ error: "User ID and amount required" });
    }

    try {
      const user = db.prepare('SELECT coins FROM users WHERE id = ?').get(userId) as any;
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const newCoins = user.coins + amount;
      db.prepare('UPDATE users SET coins = ? WHERE id = ?').run(newCoins, userId);
      res.json({ success: true, coins: newCoins });
    } catch (err) {
      res.status(500).json({ error: "Database error" });
    }
  });

  app.post("/api/coins/purchase", (req, res) => {
    const { userId, amount } = req.body;
    if (!userId || !amount) {
      return res.status(400).json({ error: "User ID and amount required" });
    }

    try {
      const user = db.prepare('SELECT coins FROM users WHERE id = ?').get(userId) as any;
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.coins < amount) {
        return res.status(400).json({ error: "Not enough coins" });
      }

      const newCoins = user.coins - amount;
      db.prepare('UPDATE users SET coins = ? WHERE id = ?').run(newCoins, userId);
      res.json({ success: true, coins: newCoins });
    } catch (err) {
      res.status(500).json({ error: "Database error" });
    }
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
    const adminEmail = req.headers['x-admin-email'];
    const expectedEmail = process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL.trim() : null;
    
    if (!expectedEmail) {
      return res.status(500).json({ error: "Server configuration error: ADMIN_EMAIL environment variable is not set." });
    }

    if (!adminEmail || adminEmail.toString().trim().toLowerCase() !== expectedEmail.toLowerCase()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const users = db.prepare('SELECT id, username, email, coins, streak_count, last_streak_date, created_at, profile_picture FROM users ORDER BY created_at DESC').all();
      res.json({ success: true, users });
    } catch (err) {
      res.status(500).json({ error: "Database error" });
    }
  });

  // Videos API routes
  app.get("/api/videos", (req, res) => {
    try {
      const videos = db.prepare('SELECT * FROM videos ORDER BY created_at DESC').all();
      res.json({ success: true, videos });
    } catch (err) {
      res.status(500).json({ error: "Database error" });
    }
  });

  app.post("/api/admin/videos", (req, res) => {
    const adminEmail = req.headers['x-admin-email'];
    const expectedEmail = process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL.trim() : null;
    
    if (!expectedEmail || !adminEmail || adminEmail.toString().trim().toLowerCase() !== expectedEmail.toLowerCase()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { title, category, url, time, image_url } = req.body;
    if (!title || !category || !url || !time) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const result = db.prepare('INSERT INTO videos (title, category, url, time, image_url) VALUES (?, ?, ?, ?, ?)').run(title, category, url, time, image_url || null);
      res.json({ success: true, id: result.lastInsertRowid });
    } catch (err) {
      res.status(500).json({ error: "Failed to add video" });
    }
  });

  app.delete("/api/admin/videos/:id", (req, res) => {
    const adminEmail = req.headers['x-admin-email'];
    const expectedEmail = process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL.trim() : null;
    
    if (!expectedEmail || !adminEmail || adminEmail.toString().trim().toLowerCase() !== expectedEmail.toLowerCase()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      db.prepare('DELETE FROM videos WHERE id = ?').run(req.params.id);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete video" });
    }
  });

  app.put("/api/admin/videos/:id", (req, res) => {
    const adminEmail = req.headers['x-admin-email'];
    const expectedEmail = process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL.trim() : null;
    
    if (!expectedEmail || !adminEmail || adminEmail.toString().trim().toLowerCase() !== expectedEmail.toLowerCase()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { title, category, url, time, image_url } = req.body;
    if (!title || !category || !url || !time) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      db.prepare('UPDATE videos SET title = ?, category = ?, url = ?, time = ?, image_url = ? WHERE id = ?').run(title, category, url, time, image_url || null, req.params.id);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Failed to update video" });
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
