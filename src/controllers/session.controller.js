// TEMP in-memory store (DB later)
let currentSession = {
    id: 1,
    title: "Midterm Exam - DS",
    status: "INACTIVE"
  };
  
  // Admin starts session
  exports.startSession = (req, res) => {
    currentSession.status = "LIVE";
    res.json({
      message: "Session started",
      session: currentSession
    });
  };
  
  // Admin stops session
  exports.stopSession = (req, res) => {
    currentSession.status = "INACTIVE";
    res.json({
      message: "Session stopped",
      session: currentSession
    });
  };
  
  // Students check session status
  exports.getLiveSession = (req, res) => {
    res.json(currentSession);
  };
  