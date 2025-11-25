// app.js
// ----------------------------------------
// Express App Setup (no server.listen here)
// ----------------------------------------

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Import individual routes
const notificationsRoute = require("./routes/notifications");

const app = express();

// ----------------------------------------
// Middlewares
// ----------------------------------------

app.use(helmet());                 // Security headers
app.use(cors());                   // Allow frontend to connect
app.use(express.json());           // Built-in body parser
app.use(express.urlencoded({       // Parse FORM data
  extended: true
}));
app.use(morgan("dev"));            // Logging in dev mode

// ----------------------------------------
// Routes
// ----------------------------------------

app.use("/api/notifications", notificationsRoute);

// Health check (default route)
app.get("/health", (req, res) => {
  res.json({ message: "Backend is running " });
});

// ----------------------------------------
// Global Error Handler
// ----------------------------------------
app.use((err, req, res, next) => {
  console.error(" Error:", err);
  res.status(500).json({ error: "Something went wrong!" });
});

// ----------------------------------------
// Export app (server.js will use this)
// ----------------------------------------
module.exports = app;
