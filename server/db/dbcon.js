import MYSQL from 'mysql2';
const CONNECTION = MYSQL.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'mydb'
});

export default CONNECTION;