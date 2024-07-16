const db = require('../config/db');

exports.userLogin = (req, res) => {
    db.query(`SELECT * FROM Users`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            for (let i = 0; i < result.length; i++){
                let isValid = result[i].username == req.body.username && result[i].pass == req.body.password;
                if (isValid) {
                    req.session.userId = result[i].Id;
                    res.redirect(`/home`,);
                    break;
                      
                } else {
                    if (i == result.length - 1) {
                        res.render('login');
                    }
                }
            }
            
        }
    });
}