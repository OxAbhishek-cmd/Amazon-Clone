const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("../../config");

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Route to authenticate user

const validateUser = [
  body("email", "Invalid Email").isEmail(),
  body("password", "Length must be 8 characters").isLength({ min: 8 }),
];
router.post("/", validateUser, async (req, res) => {
  try {
    // Validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    // Check if user exists and verify password
    connection.query(
      "SELECT user_id, email, password FROM users WHERE email = ?",
      [email],
      async (error, result) => {
        if (error) {
          console.error("Database error:", error);
          return res.status(500).json({ error: "Database error" });
        }
        if (!result.length) {
          return res.json({ status: "failed", error: "User does not exist" });
        }
        const isPasswordMatch = await bcrypt.compare(
          password,
          result[0].password
        );

        if (!isPasswordMatch) {
          return res
            .status(401)
            .json({ status: "failed", error: "Invalid credentials" });
        }
        res.json({
          status: "ssuccess",
          error: false,
          data: {
            token: jwt.sign({ user_id: result.user_id }, JWT_SECRET),
          },
        });
      }
    );
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Error authenticating user" });
  }
});

module.exports = router;
