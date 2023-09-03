const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const connection = require("./config");
const { body, validationResult } = require("express-validator");

// Helper function to handle database queries and send responses
function handleQuery(sql, params, successMessage, res) {
  connection.query(sql, params, (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (!Array.isArray(result)) {
      res.json({ data: result });
    } else {
      res.json({ data: result });
    }
  });
}

// Route to get orders for a user
router.post("/", fetchUser, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const sql =
      "SELECT o.order_id, p.product_id, p.title, p.amount, p.image, p.rating, oi.quantity FROM order_items oi JOIN orders o ON oi.order_id = o.order_id JOIN products p ON oi.product_id = p.product_id WHERE o.user_id = ?;";

    handleQuery(sql, [userId], "Orders fetched successfully", res);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to create a new order for a user
router.post(
  "/order",
  fetchUser,
  [body("items", "Invalid parameter").isArray({ min: 1 })],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const userId = req.user.user_id;
      const { items } = req.body;
      const sql1 = "INSERT INTO orders (user_id) VALUES (?)";
      connection.query(sql1, [userId], async (err, result) => {
        if (err) {
          console.error("Error creating order:", err);
          return res.status(500).json({ error: "Error creating cart" });
        }
        for (let i = 0; i < items.length; i++) {
          await connection.query(
            "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?,?,?)",
            [result.insertId, items[i].product_id, items[i].quantity],
            (error) => {
              if (error) {
                console.error("Error adding cart item:", error);
                return res
                  .status(500)
                  .json({ error: "Error adding cart item" });
              }
              if (i === items.length - 1) {
                // Send response after all items are inserted
                res.json({ status: "success" });
              }
            }
          );
        }
      });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
