const mysql = require('mysql2');
const { config } = require('dotenv');
config();
const connection = mysql.createConnection({
  user: process.env.USERNAME,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME
});

connection.connect();
module.exports = connection;
