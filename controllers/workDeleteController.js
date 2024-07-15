const db = require('../config/db');

exports.deleteWork = (req, res) => {
    const id = req.params.id; 
    db.query(`DELETE from Items WHERE id = ${id}`, (err) => {
        if (err){
            console.log(err);
        } else (
            db.query(`SELECT * FROM Items`, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render('index', { Item: result});
                }
            })
        )
    
    });

}