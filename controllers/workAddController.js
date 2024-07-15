const db = require("../config/db");

exports.addWork = (req, res) => {
    if (req.body.item){
        db.query(`INSERT INTO Items (Item) VALUES ("${req.body.item}")`, (err) => {
            db.query(`SELECT * FROM Items`, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render('index', { Item: result});
                }
            });
        });

    }else{
        db.query(`SELECT * FROM Items`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.render('index', { Item: result});
            }
        });

    }

};