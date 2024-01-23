const express = require("express");
const router = express.Router();
const fetchUser = require("../../middleware/fetchUser");
const connection = require("../../config");

// Router get
router.get("/", fetchUser, (req, res) => {
  console.log("get Cart");
  const userId = req.user.user_id;
  const sql = `SELECT p.product_id, p.image, p.title, p.price, ci.quantity
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
    
    // Always return result as an array
    const data = result && Array.isArray(result) ? result : [result];

    if (!result || result.length === 0) {
      return res.status(200).json({ status: "failed", error: "No data", data:[] });
    }

    res.json({ status: "success", error: false, data });
  });
});

module.exports = router;
