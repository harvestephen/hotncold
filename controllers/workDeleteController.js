const db = require('../config/db');

exports.deleteWork = (req, res) => {
    const id = req.params.id; 
    db.query(`DELETE from Items WHERE id = ${id}`, (err) => {
        if (err){
            console.log(err);
        } else (
            db.query(`SELECT * FROM Items WHERE userid = ${req.session.userId}`, (err, results) => {
                if (err) {
                  return res.status(500).send(err);
                }
                res.render('index', { Item: results });
              })
        )
    
    });

}