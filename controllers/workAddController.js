const db = require("../config/db");

exports.addWork = (req, res) => {
    if (req.body.item){
        db.query(`INSERT INTO Items (Item, userid) VALUES ("${req.body.item}", ${req.session.userId})`, (err) => {
            db.query(`SELECT * FROM Items WHERE userid = ${req.session.userId}`, (err, results) => {
                if (err) {
                  return res.status(500).send(err);
                }
                res.render('index', { Item: results });
              });
        });

    }else{
        db.query(`SELECT * FROM Items WHERE userid = ${req.session.userId}`, (err, results) => {
            if (err) {
              return res.status(500).send(err);
            }
            res.render('index', { Item: results });
          });
    }

};