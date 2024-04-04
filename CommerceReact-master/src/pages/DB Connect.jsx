// server.js
const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db name'
});

// database connect
db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected');
});

// fetching data
app.get('/api/data', (req, res) => {
  const sql = 'SELECT * FROM your_table';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.listen(3306, () => {
  console.log('Server is running on port 3306');
});