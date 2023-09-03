const express = require("express");
const router = express.Router();
const connection = require("../config");

// Helper function to handle database queries and send responses
function handleQuery(sql, params, successMessage, res) {
  connection.query(sql, params, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json({ data: results, message: successMessage });
  });
}

// Route to get all products
router.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM products";
    handleQuery(sql, [], "Products fetched successfully", res);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get a specific product by ID
router.post("/specific", async (req, res) => {
  try {
    const { product_id } = req.body;
    const sql = "SELECT * FROM products WHERE product_id = ?";
    handleQuery(sql, [product_id], "Product fetched successfully", res);
  } catch (error) {
    console.error("Error fetching specific product:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
