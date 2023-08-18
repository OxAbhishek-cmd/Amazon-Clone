const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("./config");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "ILoveJavaScript";

// ROUTE 1: Create a User using POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    // Validation checks for name, email, and password
    body("name", "Invalid Name").isLength({ min: 3 }),
    body("email", "Invalid Email").isEmail(),
    body("password", "Length must be 8 characters").isLength({ min: 8 }),
  ],
  async (req, res) => {
    // Validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    const sql1 = "SELECT * FROM user WHERE email = ?";
    connection.query(sql1, [req.body.email], (error, results, fields) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ error: "Error checking user existence" });
      }

      if (results.length === 1) {
        return res.json({ status: "fail", error: "User already exists" });
      }

      // Hash the password and insert user data into the database
      bcrypt.hash(password, 12, (err, hashedPassword) => {
        if (err) {
          console.error("Error hashing password:", err);
          return res.status(500).json({ error: "Error creating user" });
        }

        const sql2 =
          "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
        connection.query(
          sql2,
          [name, email, hashedPassword],
          (insertError, insertResults, insertFields) => {
            if (insertError) {
              console.error("Error executing query:", insertError);
              return res.status(500).json({ error: "Error creating user" });
            }

            const data = { user: { id: insertResults.email } };
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.header("auth-token", authtoken);
            res
              .header("Content-Type", "application/json")
              .json({
                message: "User created successfully",
                authtoken,
                insertResults,
              });
          }
        );
      });
    });
  }
);

// ROUTE 2: Authenticate User using POST "/api/auth/login/". No login required
router.post(
  "/login",
  [
    // Validation checks for email and password
    body("email", "Invalid Email").isEmail(),
    body("password", "Length must be 8 characters").isLength({ min: 8 }),
  ],
  async (req, res) => {
    // Validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Handle login logic
    const { email, password } = req.body;

    // Check if user exists and verify password
    const sql1 = "SELECT * FROM user WHERE email = ?";
    connection.query(sql1, [email], async (error, results, fields) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ error: "Error checking user existence" });
      }

      if (results.length === 0) {
        return res.json({ status: "fail", error: "User does not exist" });
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        results[0].password
      );
      if (!isPasswordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign({ user_id: results[0].id }, JWT_SECRET);

      res.json({ token, results, status: "Valid Credentials" });
    });
  }
);

// ROUTE 3: Get user details using POST "/api/auth/getuser". Requires authentication
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userID = req.user.email;
    const sql1 = "SELECT name, email FROM user WHERE email = ?";
    connection.query(sql1, [userID], async (error, results, fields) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ error: "Error checking user existence" });
      }
      res.header("Content-Type", "application/json").json(results);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 4: Add user address using POST "/api/auth/addaddress". Requires authentication
router.post("/addaddress", fetchUser, async (req, res) => {
  try {
    const userID = req.user.email;
    const {
      selectedCountry,
      fullName,
      phoneNumber,
      Address,
      city,
      state,
      zipCode,
    } = req.body;
    const sql1 =
      "INSERT INTO userinfo (email, country, fullname, phone, address, city, state, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(
      sql1,
      [
        userID,
        selectedCountry,
        fullName,
        phoneNumber,
        Address,
        city,
        state,
        zipCode,
      ],
      async (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          return res
            .status(500)
            .json({ error: "Error checking user existence" });
        }
        res
          .header("Content-Type", "application/json")
          .json({ status: "success", results });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 5: Get user addresses using POST "/api/auth/getaddress". Requires authentication
router.post("/getaddress", fetchUser, async (req, res) => {
  try {
    const userID = req.user.email;
    const sql1 = "SELECT * FROM userinfo WHERE email = ?";
    connection.query(sql1, [userID], async (error, results, fields) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ error: "Error checking user existence" });
      }
      res.header("Content-Type", "application/json").json(results);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
