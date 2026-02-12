const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const authMiddleware = require("../middleware/auth.middleware.js");


// GET current session
router.get("/live", async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM sessions ORDER BY id DESC LIMIT 1"
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error("🔥 DB ERROR:", err);   // VERY IMPORTANT
      res.status(500).json({ error: err.message });
    }
  });
  

// START session
router.post("/start", authMiddleware, async (req, res) => {
    try {
      const sessionResult = await pool.query(
        "UPDATE public.sessions SET status='LIVE', updated_at=NOW() WHERE id=1 RETURNING *"
      );
  
      await pool.query(
        "INSERT INTO activity_logs (action, entity, entity_id) VALUES ($1, $2, $3)",
        ["SESSION_STARTED", "session", 1]
      );
  
      res.json({
        message: "Session started",
        session: sessionResult.rows[0],
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to start session" });
    }
  });
  

// STOP session
router.post("/stop", async (req, res) => {
    try {
      const sessionResult = await pool.query(
        "UPDATE public.sessions SET status='INACTIVE', updated_at=NOW() WHERE id=1 RETURNING *"
      );
  
      await pool.query(
        "INSERT INTO activity_logs (action, entity, entity_id) VALUES ($1, $2, $3)",
        ["SESSION_STOPPED", "session", 1]
      );
  
      res.json({
        message: "Session stopped",
        session: sessionResult.rows[0],
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to stop session" });
    }
  });
  

module.exports = router;
