var mysql      = require('mysql');
require('dotenv').config()
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
});
 
connection.connect();

module.exports = connection;