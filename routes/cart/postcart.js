const express = require("express");
const router = express.Router();
const fetchUser = require("../../middleware/fetchUser");
const connection = require("../../config");
const { body, validationResult } = require("express-validator");

// Router add cart item
router.post(
  "/",
  fetchUser,
  [
    body("product_id", "Invalid Id").isNumeric(),
    body("quantity", "Invalid quantity").isNumeric(),
  ],
  async (req, res) => {
    console.log("post cart");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.user_id;

    connection.query("SELECT * FROM cart WHERE user_id = ?", [userId], (error, result) => {
      if (error) {
        console.error("Error selecting cart:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      let cart_id;

      if (result.length > 0) {
        cart_id = result[0].cart_id;
        insertCartItem(cart_id);
      } else {
        connection.query("INSERT INTO cart (user_id) VALUES (?)", [userId], (error, result) => {
          if (error) {
            console.error("Error inserting new cart:", error);
            return res.status(500).json({ error: "Internal server error" });
          }
          cart_id = result.insertId;
          insertCartItem(cart_id);
        });
      }
    });

    function insertCartItem(cartId) {
      const { product_id, quantity } = req.body;

      connection.query(
        "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?,?,?)",
        [cartId, product_id, quantity],
        (error) => {
          if (error) {
            console.error("Error inserting cart item:", error);
            return res.status(500).json({ error: "Internal server error" });
          }
          res.status(200).json({ status: "success", error: false });
        }
      );
    }
  }
);

module.exports = router;
