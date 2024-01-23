const express = require("express");
const router = express.Router();
const fetchUser = require("../../middleware/fetchUser");
const connection = require("../../config");

router.post("/", fetchUser, async (req, res) => {
  try {
    const userId = req.user.user_id;

    connection.query("SELECT * FROM cart WHERE user_id = ?", [userId], (error, result) => {
      if (error) {
        console.error("Error selecting cart:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      let cart_id;

      if (result.length > 0) {
        cart_id = result[0].cart_id;

      } else {
        connection.query("INSERT INTO cart (user_id) VALUES (?)", [userId], (error, result) => {
          if (error) {
            console.error("Error inserting new cart:", error);
            return res.status(500).json({ error: "Internal server error" });
          }
          cart_id = result.insertId;

        });
      }
      insertCartItem(req.body.cartItems, res);
    });

    async function insertCartItem(newItems, res) {
      const query3 = "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?,?,?)";
      for (const newItem of newItems) {
        await connection.execute(query3, [cartId, newItem.product_id, newItem.quantity]);
      }
      res.status(200).json({ message: "Cart updated successfully" });
    }

    // Insert the new items into the cart_items table

  } catch (error) {
    console.error("Error creating mergecart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
