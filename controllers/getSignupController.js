const errors = require('./userSignupController');

const userEmpty = errors.userEmpty;
const passwordUnmatched = errors.passwordUnmatched;
const passwordEmpty = errors.passwordEmpty;
const userUnique = errors.userUnique;

console.log(userEmpty);
console.log(passwordEmpty);
console.log(passwordUnmatched);
console.log(userUnique);


exports.getSignup = (req, res) => {
    console.log(req.session.userExists);
    console.log(req.session.passwordUnmatched);
    res.render('signup', { userExists: req.session.userExists, passwordUnmatched: req.session.passwordUnmatched });
}