const express = require("express");
const router = express.Router();
const fetchUser = require("../../middleware/fetchUser");
const connection = require("../../config");

// Route to create a new order for a user
router.post("/", fetchUser, async (req, res) => {
  console.log("Order Initiated");
  try {
    const userId = req.user.user_id;

    connection.query(
      "SELECT ci.cart_id, ci.product_id, ci.quantity, p.price FROM cart_items ci JOIN cart c ON ci.cart_id = c.cart_id JOIN products p ON ci.product_id = p.product_id WHERE c.user_id = ?",
      [userId],
      async (error, result) => {
        if (error) {
          console.error("Error retrieving cart items:", error);
          return res.status(500).json({ status: "error", error: error.message });
        }

        if (result.length > 0) {
          console.log("Order received");
          const amount = totalAmount(result);
          const cartId = result[0].cart_id;
          const data = result;
          connection.query(
            "INSERT INTO orders (user_id, amount) VALUES (?, ?)",
            [userId, amount],
            async (error, result) => {
              if (error) {
                console.error("Error creating order:", error);
                return res.status(500).json({ status: "error", error: error.message });
              }

              const orderId = result.insertId;

              data.forEach((item) => {
                connection.execute(
                  "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)",
                  [orderId, item.product_id, item.quantity]
                );
              })

              await connection.execute("DELETE FROM cart_items WHERE cart_id = ?", [cartId]);
              await connection.execute("DELETE FROM cart WHERE cart_id = ?", [cartId]);

              console.log("Order complete ", orderId);

              res.json({ status: "success", error: false, orderId });
            }
          );
        }
      }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

const totalAmount = (cart) => {
  return cart.reduce((total, item) => total + item.quantity * item.price, 0);
};
