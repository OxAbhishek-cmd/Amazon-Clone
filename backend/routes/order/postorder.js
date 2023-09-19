const express = require("express");
const router = express.Router();
const fetchUser = require("../../middleware/fetchUser");
const connection = require("../../config");

// Route to create a new order for a user
router.post("/", fetchUser, async (req, res) => {
  try {
    const userId = req.user.user_id;
    connection.query(
      "SELECT c.cart_id, ci.item_id, ci.product_id, ci.quantity FROM cart_items ci JOIN cart c ON ci.cart_id = c.cart_id AND c.user_id = ?;",
      [userId],
      (error, result1) => {
        if (error) {
          console.error("Error retrieving cart items:", error);
          return res.status(500).json({ error: "Internal server error" });
        }

        if (result1.length > 0) {

          connection.query(
            "INSERT INTO orders (user_id,amount) VALUES (?,?)",
            [userId,req.body.amount],
            (error, result2) => {
              if (error) {
                console.error("Error creating order:", error);
                return res.status(500).json({ error: "Internal server error" });
              }

              const orderId = result2.insertId;

              // Use a loop to insert order items
              for (const item of result1) {
                connection.query(
                  "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)",
                  [orderId, item.product_id, item.quantity],
                  (error) => {
                    if (error) {
                      console.error("Error inserting order item:", error);
                      return res
                        .status(500)
                        .json({ error: "Internal server error" });
                    }
                  }
                );

                // Delete the corresponding cart item
                connection.query(
                  "DELETE FROM cart_items WHERE item_id = ?",
                  [item.item_id],
                  (error) => {
                    if (error) {
                      console.error("Error deleting cart item:", error);
                      return res
                        .status(500)
                        .json({ error: "Internal server error" });
                    }
                  }
                );
              }

              // Delete the cart
              connection.query(
                "DELETE FROM cart WHERE cart_id = ?",
                [result1[0].cart_id],
                (error) => {
                  if (error) {
                    console.error("Error deleting cart:", error);
                    return res
                      .status(500)
                      .json({ error: "Internal server error" });
                  }

                  res.json({ status: "success", error: false });
                }
              );
            }
          );
        } else {
          // If there are no cart items, respond with an appropriate message
          res.json({ status: "No cart items found", error: true });
        }
      }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
