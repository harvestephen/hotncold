const db = require('../config/db'); // Assuming you have a database module

exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM Items', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.render('index', { Item: results });
  });
};