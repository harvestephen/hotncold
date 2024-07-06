const express = require('express');
const router = express.Router();
const db = require("../config/db");


//Routes to handle HTTP Requests
router.get('/', (req, res) => {
    db.query(`SELECT * FROM Items`, (err, result) => {
        console.log(result);
        res.render("index", { item: result});
    });
    
});

router.post('/', (req, res) => {
    db.query(`INSERT INTO Items (Item) VALUES ("${req.body.item}")`, (err) => {
        console.log(err);
    });
    res.render("index", { item: `:: ${req.body.item} ::` });
});


module.exports = router;