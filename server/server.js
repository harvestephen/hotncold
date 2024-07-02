const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "Works",
});

db.query("SELECT * FROM Items", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
})

app.get("/items", (req, res) => {
    const sql = "SELECT * FROM Items";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
})

app.listen(8081, () => {
    console.log("listening...");
});