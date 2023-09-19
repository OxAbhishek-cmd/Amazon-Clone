const express = require("express");
const router = express.Router();
const fetchUser = require("../../middleware/fetchUser");
const connection = require("../../config");

// Route to get orders for a user
router.get("/", fetchUser, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const sql =
      "SELECT o.order_id, p.product_id, p.title, p.price, p.image, p.rating, oi.quantity o.amount FROM order_items oi JOIN orders o ON oi.order_id = o.order_id JOIN products p ON oi.product_id = p.product_id WHERE o.user_id = ?;";

    connection.query(sql, [userId], (error, result) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ error: "Error executing query:" });
      }
      if (!Array.isArray(result)) {
        res.json({ status: "success", error: false, data: [result] });
      } else {
        res.json({ status: "success", error: false, data: result });
      }
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to create a new order for a user

module.exports = router;
