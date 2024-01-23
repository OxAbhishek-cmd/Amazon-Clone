const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const util = require("util");
const connection = require("../../config");

const JWT_SECRET = "ILoveJavaScript";

// Convert callback-style connection.query to promise-based
const queryAsync = util.promisify(connection.query).bind(connection);

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
      // Check if the email already exists
      const existingUser = await queryAsync(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      if (existingUser.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // If email doesn't exist, proceed with user creation
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await queryAsync(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
      );

      const authtoken = jwt.sign({ user_id: result.insertId }, JWT_SECRET);
      res.header("auth-token", authtoken).json({
        status: "success",
        error: false,
        message: "User created successfully",
        data: { authtoken },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Error creating user" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

module.exports = router;
