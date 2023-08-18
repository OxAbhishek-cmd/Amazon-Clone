var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '88grEQg1BCyygsz-',
  database : 'amazon_clone'
});
 
connection.connect();

module.exports = connection;