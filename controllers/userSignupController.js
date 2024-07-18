const db = require('../config/db');

let userEmpty = false;
let passwordUnmatched = false;
let passwordEmpty = false;
let userUnique = true;

function signUp(req, res) {
    //get variables in signup.js
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    //check if username already exists and not empty
    db.query(`SELECT * FROM Users`, (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            if (username === "") {
                userEmpty = true;
                console.log("Username empty");
                return res.redirect('/signup');
            } else {
                for (let i = 0; i < result.length; i++) {
                    if (result[i].username === username) {
                        userUnique = false;
                        console.log("Username already exists");
                        return res.redirect('/signup');
                    }
                }

                // If username is unique, proceed with password check
                if (password !== "" && confirmPassword !== "") {
                    if (password === confirmPassword) {
                        db.query(`INSERT INTO Users (username, pass) VALUES (?, ?)`, [username, password], (err) => {
                            if (err) {
                                return res.send(err);
                            } else {
                                console.log("Signup new user success");
                                return res.redirect('/login');
                            }
                        });
                    } else {
                        passwordUnmatched = true;
                        console.log("Password is not matched");
                        return res.redirect('/signup');
                    }
                } else {
                    passwordEmpty = true;
                    console.log("Password empty");
                    return res.redirect('/signup');
                }
            }
        }
    });
}

module.exports = { signUp, userEmpty, passwordEmpty, userUnique, passwordUnmatched };
