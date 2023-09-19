const express = require("express");
const router = express.Router();
const fetchUser = require("../../middleware/fetchUser");
const connection = require("../../config");
const { body, validationResult } = require("express-validator");

// Router remove cart item
router.delete(
  "/",
  fetchUser,
  [body("product_id", "Invalid Id").isNumeric()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.user_id;
    const { product_id } = req.body;
    connection.query(
      "SELECT cart_id FROM cart WHERE user_id = ?",
      [userId],
      (error, result1) => {
        if (error) {
          console.error("Error executing query:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
        if (result1.length === 0) {
          return res.status(404).json({ error: "User has no cart" });
        }

        const cartId = result1[0].cart_id;
        connection.query(
          `DELETE FROM cart_items  WHERE product_id = ? AND cart_id = ?`,
          [product_id, cartId],
          (error, result) => {
            if (error) {
              console.error("Error executing query:", error);
              return res.status(500).json({ error: "Internal server error" });
            }

            if (result.affectedRows === 0) {
              return res
                .status(404)
                .json({ error: "Item not found in the cart" });
            }

            res.status(200).json({ status: "success", error: false });
          }
        );
      }
    );
  }
);

module.exports = router;
