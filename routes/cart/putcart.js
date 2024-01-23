const express = require("express");
const router = express.Router();
const fetchUser = require("../../middleware/fetchUser");
const connection = require("../../config");
const { body, validationResult } = require("express-validator");
// Router update quantity
router.put(
  "/",
  fetchUser,
  [
    body("product_id", "Invalid Id").isNumeric(),
    body("quantity", "Invalid quantity").isNumeric(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.user_id;
    const { product_id, quantity } = req.body;
    const sql = `UPDATE cart_items AS ci
      JOIN cart AS c ON ci.cart_id = c.cart_id
      SET ci.quantity = ?
      WHERE ci.product_id = ? AND c.user_id = ?;
      `;
    connection.query(sql, [quantity, product_id, userId], (error) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(200).json({ status: "success", error: false });
    });
  }
);
module.exports = router;
