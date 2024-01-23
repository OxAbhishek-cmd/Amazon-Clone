const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const items = require("./routes/items/items");

const getuser = require("./routes/credentials/getuser");
const createuser = require("./routes/credentials/createuser");
const loginuser = require("./routes/credentials/loginuser");
const getorder = require("./routes/order/getorder");
const postorder = require("./routes/order/postorder");
const getaddress = require("./routes/address/getaddress");
const postaddress = require("./routes/address/postaddress");
const getcart = require("./routes/cart/getcart");
const postcart = require("./routes/cart/postcart");
const deletecart = require("./routes/cart/deletecart");
const putcart = require("./routes/cart/putcart");
const bulkpostcart = require("./routes/cart/bulkpostcart");
const errorHandler = require("./middleware/errorHandler");
const orderById = require("./routes/order/orderbyid");
const {configDotenv} = require("dotenv");
configDotenv();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,"./client/build")))
app.use("/api/items", items);

app.use("/api/credentials/getuser",getuser );
app.use("/api/credentials/createuser",createuser );
app.use("/api/credentials/loginuser", loginuser);

app.use("/api/order/getorder", getorder);
app.use("/api/order/orderbyid",orderById);
app.use("/api/order/postorder", postorder);

app.use("/api/address/getaddress", getaddress);
app.use("/api/address/postaddress", postaddress);

app.use("/api/cart/getcart", getcart);
app.use("/api/cart/postcart", postcart);
app.use("/api/cart/putcart", putcart);
app.use("/api/cart/deletecart", deletecart);
app.use("/api/cart/bulkpostcart", bulkpostcart);

app.get("*",(_,res)=>{
  res.sendFile(path.join(__dirname,"./client/build/index.html"),err=>{res.status(500).send(err)})
})

app.all('*', (req, res) => {
  console.log(`Unknown route: ${req.method} ${req.originalUrl}`);
  res.status(404).send('Not Found');
});
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
