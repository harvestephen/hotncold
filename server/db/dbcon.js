const MYSQL = require('mysql2');
const CONNECTION = MYSQL.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'mydb'
});

module.exports = CONNECTION;