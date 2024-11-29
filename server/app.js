const EXPRESS = require('express');
const CORS = require('cors');
const APP = EXPRESS();
const PORT = 3000;

const DB = require('./db/dbcon');

APP.use(CORS());

DB.connect((err) => {
 if (err) throw err;
 console.log("Database Activated....");
});

APP.listen(PORT, () => {
  console.log("Server is running at PORT: " + PORT);
})