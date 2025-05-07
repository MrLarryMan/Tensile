const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define the path to your SQLite database file
const dbPath = path.join(__dirname, '/data/database.sqlite'); // Adjust the path as needed

// Initialize the SQLite database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database: ', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Export the database connection for use in other parts of your app
module.exports = db;