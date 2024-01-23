const express = require("express");
const router = express.Router();
const fetchUser = require("../../middleware/fetchUser");
const connection = require("../../config");

router.get("/", fetchUser, (req, res) => {
  const userID = req.user.user_id;

  connection.query("SELECT * FROM address WHERE user_id = ?", [userID], (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ status:"error",error: "Error retrieving user addresses" });
    }
    if (result.length === 0) {
      return res
        .status(200)
        .json({ status: "failed"});
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
    console.log("get address");
    res.json({ status: "success", data:addresses });
  });
});

module.exports = router;
