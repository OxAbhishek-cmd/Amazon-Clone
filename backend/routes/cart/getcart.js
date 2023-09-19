const express = require("express");
const router = express.Router();
const fetchUser = require("../../middleware/fetchUser");
const connection = require("../../config");

// Router get
router.get("/", fetchUser, (req, res) => {
  const userId = req.user.user_id;
  const sql = `SELECT p.product_id, p.image, p.title, p.price, p.rating, ci.quantity
    FROM products p
    JOIN cart_items ci ON p.product_id = ci.product_id
    JOIN cart c ON ci.cart_id = c.cart_id
    WHERE c.user_id = ?;
    `;
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Error fetching cart items" });
    }
    if (!result || result.length === 0) {
      return res.status(200).json({ status:"failed",error:"NO data"});
    }
    res.json({status:"success",error:false, data: [result] });
  });
});

module.exports = router;
