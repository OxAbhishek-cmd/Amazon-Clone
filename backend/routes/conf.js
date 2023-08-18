const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '88grEQg1BCyygsz-',
    database : 'amazon_clone'
  });
   

// Define the SQL query to create the table
const createTableQuery = `
  CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`;

// Execute the create table query
connection.query(createTableQuery, (error, results, fields) => {
  if (error) {
    console.error('Error creating table:', error);
  } else {
    console.log('Table created successfully');
  }

  // Close the database connection
  connection.end();
});
