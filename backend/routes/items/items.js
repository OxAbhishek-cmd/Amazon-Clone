const express = require("express");
const router = express.Router();
const connection = require("../../config");

// Route to get all products
router.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM products";
    console.log("data is transfering")
    connection.query(sql, (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      res.json({ status: "success", error: false, data: results });
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
