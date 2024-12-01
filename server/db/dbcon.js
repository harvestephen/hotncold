import MYSQL from 'mysql2';
const CONNECTION = MYSQL.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'mydb'
});

export default CONNECTION;