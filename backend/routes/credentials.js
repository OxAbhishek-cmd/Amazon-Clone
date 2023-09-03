const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("./config");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = process.env.JWT_SECRET || "ILoveJavaScript";

// Validation middleware for common checks
const validateUser = [
  body("email", "Invalid Email").isEmail(),
  body("password", "Length must be 8 characters").isLength({ min: 8 }),
];

// Route to create a new user
router.post("/createuser", validateUser, async (req, res) => {
  try {
    // Validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await checkUserExists(email);

    if (userExists) {
      return res.json({ status: "fail", error: "User already exists" });
    }

    // Hash the password and insert user data into the database
    const hashedPassword = await hashPassword(password);
    const insertResults = await insertUser(name, email, hashedPassword);

    // Generate JWT token
    const authtoken = generateAuthToken({ id: insertResults.email });

    res
      .header("auth-token", authtoken)
      .json({ message: "User created successfully", authtoken, insertResults });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

// Route to authenticate user
router.post("/login", validateUser, async (req, res) => {
  try {
    // Validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if user exists and verify password
    const user = await getUserByEmail(email);

    if (!user) {
      return res.json({ status: "fail", error: "User does not exist" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateAuthToken({ user_id: user.user_id });

    res.json({ token, user, status: "Valid Credentials" });
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Error authenticating user" });
  }
});

/**
 * Route to get user details. Requires authentication.
 */
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userID = req.user.user_id;
    const user = await getUserByID(userID);
    res.json(user);
  } catch (error) {
    console.error("Error retrieving user details:", error);
    res.status(500).json({ error: "Error retrieving user details" });
  }
});

// Helper functions

async function checkUserExists(email) {
  const sql = "SELECT * FROM user WHERE email = ?";
  const [results] = await connection.query(sql, [email]);
  return results.length === 1;
}

async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

async function insertUser(name, email, hashedPassword) {
  const sql = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
  const [results] = await connection.query(sql, [name, email, hashedPassword]);
  return results;
}

async function getUserByEmail(email) {
  const sql = "SELECT * FROM user WHERE email = ?";
  const [results] = await connection.query(sql, [email]);
  return results[0] || null;
}

async function getUserByID(userID) {
  const sql = "SELECT name, email FROM user WHERE user_id = ?";
  const [results] = await connection.query(sql, [userID]);
  return results[0] || null;
}

function generateAuthToken(data) {
  return jwt.sign(data, JWT_SECRET);
}

module.exports = router;
