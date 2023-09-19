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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userId = req.user.user_id;
    const { product_id, quantity } = req.body;
    const sql1 = "INSERT INTO cart (user_id) VALUES (?)";
    connection.query(sql1, [userId], (err, result) => {
      if (err) {
        console.error("Error creating cart:", err);
        return res.status(500).json({ error: "Error creating cart" });
      }
      const sql2 =
        "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?,?,?)";

      connection.query(
        sql2,
        [result.insertId, product_id, quantity],
        (error, result) => {
          if (error) {
            console.error("Error executing query:", error);
            return res.status(500).json({ error: "Internal server error" });
          }
          res.status(200).json({ status: "success", error: false });
        }
      );
    });
  }
);

module.exports = router;
