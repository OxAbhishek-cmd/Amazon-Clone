const express = require("express");
const router = express.Router();
const connection = require("../../config");
const fetchUser = require("../../middleware/fetchUser");

/**
 * Route to get user details. Requires authentication.
 */
router.get("/", fetchUser, async (req, res) => {
  try {
    const userID = req.user.user_id;
    console.log("get request");
    connection.query(
      "SELECT name, email FROM users WHERE user_id = ?",
      [userID],
      (error, results) => {
        if (error) {
          console.error("Error retrieving user details:", error);
          return res.status(500).json({ status: "error", message: "Database error" });
        }

        // Check if any rows were returned
        if (results.length === 0) {
          return res.status(404).json({ status: "error", message: "User not found" });
        }

        // Access the first row to get user details
        const user = results[0];

        res.json({
          status: "success",
          error: false,
          data: { name: user.name },
        });
      }
    );
  } catch (error) {
    console.error("Error retrieving user details:", error);
    res.status(500).json({ status: "error", message: "Error retrieving user details" });
  }
});

module.exports = router;
