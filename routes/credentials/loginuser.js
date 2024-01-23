const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("../../config");

const JWT_SECRET = process.env.JWT_SECRET || "ILoveJavaScript";

const validateUser = [
  body("email", "Invalid Email").isEmail(),
  body("password", "Length must be 8 characters").isLength({ min: 8 }),
];

router.post("/", validateUser, async (req, res) => {
  console.log("try to login");
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "failed", errors: errors.array() });
    }

    const { email, password } = req.body;

    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (error, results) => {
        if (error) {
          console.error("Database error:", error);
          return res.status(500).json({ status: "failed", error: `Database error: ${error.message}` });
        }

        if (!results.length) {
          console.log("result received");
          return res.json({ status: "failed", error: "User does not exist" });
        }

        const isPasswordMatch = await bcrypt.compare(password, results[0].password);

        if (!isPasswordMatch) {
          console.log("password unmatch");
          return res.status(401).json({ status: "failed", error: "Invalid credentials" });
        }

        console.log("response sent");
        res.json({
          status: "success",
          error: false,
          data: {
            token: jwt.sign({ user_id: results[0].user_id }, JWT_SECRET),
            name: results[0].name,
          },
        });
      }
    );
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ status: "failed", error: "Error authenticating user" });
  }
});

module.exports = router;
