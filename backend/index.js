const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

const credentials = require('./routes/credentials');
const items = require('./routes/items');
const order = require('./routes/order');
const address = require('./routes/address');
const cart = require('./routes/cart');
const errorHandler = require('./middleware/errorHandler'); // Import the error handling middleware

app.use(cors());
app.use(express.json());
// POST /createuser  create user
// POST /login       login user
// POST /getuser     get user
app.use("/api/credentials", credentials);

// GET   /            items
// POST  /specific    specific item
app.use("/api/items", items);

// POST /             get order
// POST /order        create order
app.use("/api/order", order);

// POST /             get address
// POST /add          add address
app.use("/api/address",address);

// POST    /get        get cart items
// POST    /item       add cart items
// PUT     /item       update quantity
// DELETE  /item       delete item
// DELETE  /           delete cart
app.use("/api/cart",cart);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
