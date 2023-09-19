const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("../../config");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Validation middleware for common checks
const validateUser = [
  body("email", "Invalid Email").isEmail(),
  body("password", "Length must be 8 characters").isLength({ min: 8 }),
];

// Route to create a new user
router.post("/", validateUser, async (req, res) => {
  try {
    // Validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      connection.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        async (error, result) => {
          if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ error: "Database error" });
          }
          const authtoken = jwt.sign({ user_id: result.insertId }, JWT_SECRET);
          res.header("auth-token", authtoken).json({
            status: "success",
            error: false,
            message: "User created successfully",
            authtoken,
          });
        }
      );
    } catch (error) {
      console.error("Error hashing password:", error);
      res.status(500).json({ error: "Error creating user" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

module.exports = router;
