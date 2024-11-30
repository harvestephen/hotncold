import EXPRESS from 'express';
import CORS from 'cors';
import DB from'./db/dbcon.js';

const APP = EXPRESS();
const PORT = 3000;

APP.use(CORS(), (req, res, next) => {
  next();
});

//Database Tables CHECK
DB.query('SHOW TABLES LIKE "users"', (err, result) => {
  if (err) console.log(err);
  if (result.length === 0) {
    DB.query('CREATE TABLE users ( id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(100) NOT NULL, age INT )', (err) => {
      if (err) console.log(err);
      console.log("No Tables yet: Initiating Tables...");
      console.log("Tables Successfully Initiated...");
    });
  } else {
    console.log("Tables Loaded Successfully...");
  }
});

// HTTP HANDLERS
APP.get('/getItems', (req, res) => {
  const data = {
    name: "Harvey",
    age: 22,
    profession: "Software Developer"
  }
  res.json(data);
});


APP.listen(PORT, () => {
  console.log("Server is running at PORT: " + PORT);
})