const mysql = require("mysql");

const db = mysql.createPool({
    host:"localhost",
    user: "root",
    password:"admin",
    database: "Works",
});

module.exports = db;