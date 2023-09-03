var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '.37bDjo@JYs!MwX/',
  database : 'amazon_clone'
});
 
connection.connect();

module.exports = connection;