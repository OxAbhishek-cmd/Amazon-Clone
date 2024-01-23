const express = require("express");
const router = express.Router();
const fetchUser = require("../../middleware/fetchUser");
const connection = require("../../config");
const { body, validationResult } = require("express-validator");

const addressValidation = [
    body("fullName", "Invalid name. Minimum length: 3 characters").isLength({ min: 3 }),
    body("Country", "Country cannot be empty").isLength({ min: 1 }),
    body("phoneNumber", "Invalid phone number").isMobilePhone(),
    body("Address", "Address must be at least 5 characters long").isArray(),
    body("city", "City cannot be empty").isLength({ min: 1 }),
    body("state", "State cannot be empty").isLength({ min: 1 }),
    body("zipCode", "Zip code must be at least 6 characters long").isLength({ min: 6 }),
  ];
  
router.post("/", fetchUser, addressValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    
    const userID = req.user.user_id;
    const { fullName, phoneNumber, Address, city, state, Country, zipCode } = req.body;
    const sql1 = "INSERT INTO address (user_id, fullName, phoneNumber, address, city, state, zipCode, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(sql1, [userID, fullName, phoneNumber, Address.join("&&"), city, state, zipCode, Country], (error) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ error: "Error adding user address" });
      }
      res.status(201).json({ status: "success" });
      console.log("successfull");
    });
  });
  
  module.exports = router;
  