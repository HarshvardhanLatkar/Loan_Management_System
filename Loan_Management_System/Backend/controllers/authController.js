import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

// --------------------------------------------------
// SIGNUP
// --------------------------------------------------
export const signup = async (req, res) => {
  try {
    const { full_name, email, password, phone, address } = req.body;

    const [existing] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
      "INSERT INTO users (full_name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)",
      [full_name, email, hashedPassword, phone, address]
    );

    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --------------------------------------------------
// LOGIN
// --------------------------------------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { user_id: user[0].user_id },
      "YOUR_SECRET_KEY",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        user_id: user[0].user_id,
        full_name: user[0].full_name,
        email: user[0].email,
        phone: user[0].phone
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --------------------------------------------------
// FORGOT PASSWORD
// --------------------------------------------------
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const [user] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res.status(400).json({ message: "Email not found" });
    }

    // Create token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(resetToken, 10);
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await db.execute(
      "UPDATE users SET reset_token = ?, reset_expiry = ? WHERE email = ?",
      [hashedToken, expiry, email]
    );

    const resetURL = `http://localhost:5173/reset-password/${resetToken}`;

    await sendEmail(
      email,
      "Password Reset Request",
      `Reset your password using the link: ${resetURL}`
    );

    res.json({ message: "Reset password link sent to email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --------------------------------------------------
// RESET PASSWORD
// --------------------------------------------------
export const resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const { newPassword } = req.body;

    const [users] = await db.execute("SELECT * FROM users");

    let userMatch = null;

    for (let u of users) {
      if (u.reset_token && (await bcrypt.compare(token, u.reset_token))) {
        if (new Date(u.reset_expiry) > new Date()) {
          userMatch = u;
        }
      }
    }

    if (!userMatch) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.execute(
      "UPDATE users SET password = ?, reset_token = NULL, reset_expiry = NULL WHERE user_id = ?",
      [hashedPassword, userMatch.user_id]
    );

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
