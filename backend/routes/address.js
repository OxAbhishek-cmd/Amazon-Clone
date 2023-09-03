const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const connection = require("./config");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get user addresses using POST "/api/address/get". Requires authentication
router.post("/", fetchUser, (req, res) => {
  const userID = req.user.id;
  const sql1 = "SELECT * FROM address WHERE user_id = ?";
  connection.query(sql1, [userID], (error, results, fields) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Error retrieving user addresses" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No addresses found for this user" });
    }
    const addresses = results.map((row) => ({
      fullName: row.fullName,
      phoneNumber: row.phoneNumber,
      Address: row.address.split("&&"),
      city: row.city,
      state: row.state,
      Country: row.country,
      zipCode: row.zipCode,
    }));
    res.json({ data: addresses });
  });
});

// ROUTE 2: Add user address using POST "/api/address/add". Requires authentication
const addressValidation = [
  body("fullName", "Invalid name. Minimum length: 3 characters").isLength({ min: 3 }),
  body("Country", "Country cannot be empty").isLength({ min: 1 }),
  body("phoneNumber", "Invalid phone number").isMobilePhone(),
  body("Address", "Address must be at least 5 characters long").isLength({ min: 5 }),
  body("city", "City cannot be empty").isLength({ min: 1 }),
  body("state", "State cannot be empty").isLength({ min: 1 }),
  body("zipCode", "Zip code must be at least 6 characters long").isLength({ min: 6 }),
];

router.post("/add", fetchUser, addressValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const userID = req.user.id;
  const { fullName, phoneNumber, Address, city, state, Country, zipCode } = req.body;
  const sql1 = "INSERT INTO address (user_id, fullName, phoneNumber, address, city, state, zipCode, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(sql1, [userID, fullName, phoneNumber, Address, city, state, zipCode, Country], (error) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Error adding user address" });
    }
    res.status(201).json({ data: { status: "success" } });
  });
});

module.exports = router;
