import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";   // IMPORT ROUTES
import pool from "./config/db.js";                 // OPTIONAL: to check DB connection

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server running...");
});

// OPTIONAL: Test DB connection
pool.getConnection((err, connection) => {
  if (err) {
    console.log("❌ Database Connection Failed:", err.message);
  } else {
    console.log("✅ Database Connected Successfully!");
    connection.release();
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
