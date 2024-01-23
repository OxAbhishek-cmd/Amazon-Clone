const express = require("express");
const router = express.Router();
const fetchUser = require("../../middleware/fetchUser");
const connection = require("../../config");

// Route to get orders for a user
router.get("/", fetchUser, async (req, res) => {
  try {
    const userId = req.user.user_id;

    connection.query(
      "SELECT o.order_id, o.order_date, oi.order_item_id, oi.product_id, p.price, oi.quantity, p.image, p.title FROM orders o JOIN order_items oi ON o.order_id = oi.order_id JOIN products p ON oi.product_id = p.product_id WHERE o.user_id = ? ORDER BY o.order_id, oi.order_item_id",
      [userId],
      (error, result) => {
        if (error) {
          console.error("Error fetching orders:", error);
          return res.status(500).json({ status: "failed", error: "Internal server error", data: [] });
        }

        if (!result || result.length === 0) {
          return res.status(200).json({ status: "success", error: false, data: [] });
        }

        const data = [];
        let currentOrderId = null;
        let currentOrder = null;

        for (const row of result) {
          if (row.order_id !== currentOrderId) {
            // New order
            currentOrder = {
              order_id: row.order_id,
              date: row.order_date,
              order_item: [],
            };
            data.push(currentOrder);
            currentOrderId = row.order_id;
          }

          // Add order item to the current order
          currentOrder.order_item.push({
            item_id:row.order_item_id,
            product_id: row.product_id,
            price: row.price,
            quantity: row.quantity,
            image: row.image,
            title: row.title,
          });
        }
        res.json({ status: "success", error: false, data });
      }
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to create a new order for a user

module.exports = router;