const express = require("express");
const router = express.Router();
const fetchUser = require("../../middleware/fetchUser");
const connection = require("../../config");

router.get("/", fetchUser, (req, res) => {
  const userID = req.user.user_id;
  const sql1 = "SELECT * FROM address WHERE user_id = ?";
  connection.query(sql1, [userID], (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Error retrieving user addresses" });
    }
    if (result.length === 0) {
      return res
        .status(200)
        .json({ status: "failed", error: "No addresses found" });
    }
    const firstRow = result[0];

    const addresses = {
      fullName: firstRow.fullName,
      phoneNumber: firstRow.phoneNumber,
      Address: firstRow.address.split("&&"),
      city: firstRow.city,
      state: firstRow.state,
      Country: firstRow.country,
      zipCode: firstRow.zipCode,
    };
    res.json({ status: "success", error: false, data: addresses });
  });
});

module.exports = router;
