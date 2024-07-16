const { render } = require('ejs');
const db = require('../config/db');

exports.updateWork = (req, res) => {
    const id = req.params.id;
    const item = req.body.updateItem;
    console.log(`id = ${id} item = ${item}`);
    db.query('UPDATE Items SET Item = ? WHERE id = ?;', [item, id], (err) => {
        if (err) {
            console.log(err);
        } else {
            db.query(`SELECT * FROM Items WHERE userid = ${req.session.userId}`, (err, results) => {
                if (err) {
                  return res.status(500).send(err);
                }
                res.render('index', { Item: results });
              })
        }
    });
}