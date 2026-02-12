const express = require("express");
const cors = require("cors");
const sessionRoutes = require("./routes/session.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/session", sessionRoutes);

app.get("/", (req, res) => {
  res.send("EduScale Backend Running 🚀");
});

module.exports = app;
