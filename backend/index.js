const express = require('express')
const app = express()
const port = 5000
const cors = require('cors');
require('config.js');

app.use(cors());
app.use(express.json())
app.use("/api/credentials",require("./routes/credentials"))
// app.use("/api/",require("./routes/notes"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})