const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const connection = require("./config");
const { body, validationResult } = require("express-validator");

// Helper function to handle database queries
function executeQuery(sql, params, successMessage, res) {
  connection.query(sql, params, (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json({ status: "success", message: successMessage });
  });
}

// Router get
router.post("/get", fetchUser, (req, res) => {
  const userId = req.user.user_id;
  const sql =
    "SELECT p.product_id, p.image, p.title, p.price, p.rating, ci.quantity FROM product p, cart_items ci WHERE ci.product_id IN ( SELECT product_id, quantity FROM cart_items WHERE cart_id = (SELECT cart_id FROM cart WHERE user_id = ?));";
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Error fetching cart items" });
    }
    if (!result || result.length === 0) {
      return res.status(404).json({ error: "No cart items found for this user" });
    }
    res.json({ data: result });
  });
});

// Router add cart item
router.post(
  "/item",
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
      executeQuery(sql2, [result.insertId, product_id, quantity], "Cart item added successfully", res);
    });
  }
);

// Router update quantity
router.put(
  "/item",
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
    const sql =
      "UPDATE cart_items SET quantity = ? WHERE product_id = ? AND cart_id = (SELECT cart_id FROM cart WHERE user_id = ?)";
    executeQuery(sql, [quantity, product_id, userId], "Cart item updated successfully", res);
  }
);

// Router remove cart item
router.delete(
  "/item",
  fetchUser,
  [body("product_id", "Invalid Id").isNumeric()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const userId = req.user.user_id;
    const { product_id } = req.body;
    const sql =
      "DELETE FROM cart_items WHERE product_id = ? AND cart_id = (SELECT cart_id FROM cart WHERE user_id = ?)";
    executeQuery(sql, [product_id, userId], "Cart item deleted successfully", res);
  }
);

// Router delete cart
router.delete("/", fetchUser, async (req, res) => {
  try {
    const userId = req.user.user_id;

    const sql1 =
      "DELETE FROM cart_items WHERE cart_id = (SELECT cart_id FROM cart WHERE user_id = ?)";
    await connection.query(sql1, [userId], (error) => {
      if (error) {
        console.error("Error deleting cart items:", error);
        return res.status(500).json({ error: "Error deleting cart items" });
      }
      // Then, delete the cart itself
      const sql2 = "DELETE FROM cart WHERE user_id = ?";
      executeQuery(sql2, [userId], "Cart deleted successfully", res);
    });
  } catch (error) {
    console.error("Error deleting cart:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;



