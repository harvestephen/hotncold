import EXPRESS from 'express';
import CORS from 'cors';
import DB from'./db/dbcon.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname + '/db/dbcon.js');

const APP = EXPRESS();
const PORT = 3000;

let isLoggedIn = false;

function changeLog(arg) {
  isLoggedIn = arg;
}

APP.use(EXPRESS.json(), (req, res, next) => {
  next();
});
APP.use(CORS(), (req, res, next) => {
  next();
});

//Database Tables CHECK
DB.query('SHOW TABLES LIKE "users"', (err, result) => {
  if (err) console.log(err);
  if (result.length === 0) {
    DB.query('CREATE TABLE users ( id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(100) NOT NULL, password VARCHAR(100) )', (err) => {
      if (err) console.log(err);
      console.log("No Tables yet: Initiating Tables...");
      console.log("Tables Successfully Initiated...");
    });
  } else {
    console.log("Tables Loaded Successfully...");
  }
});

// HTTP HANDLERS
APP.post('/api/register', (req, res) => {
  const formData = req.body;
  const username = formData.username;
  const fpassword = formData.password;
  const confirmPassword = formData.confirmPassword
  if (fpassword === confirmPassword){
    const data = [username, fpassword];
    DB.query('INSERT INTO users (name, password) VALUES (?, ?)', data, (err, result) => {
      if (err) console.log(err);
      console.log(result);
    });
  }
  res.status(200).json({ message: 'Registration successful!' });
});

APP.get('/api/is-log', (req, res) => {
  res.status(200).json({
    logStatus: isLoggedIn,
  });
});

APP.post('/api/log', (req, res) => {
  const data = req.body;
  changeLog(data.logStatus);
  res.status(200).json({ message: 'Registration successful!' });
})

APP.listen(PORT, () => {
  console.log("Server is running at PORT: " + PORT);
})