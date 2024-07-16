const express = require('express');
const router = express.Router();

function isLoggedIn(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        console.log("not logged");
        res.redirect('/login');
    }
}


//Http Controllers
const selectQuery = require('../controllers/workSelectController');
const addQuery = require('../controllers/workAddController');
const deleteQuery = require('../controllers/workDeleteController');
const updateQuery = require('../controllers/workUpdateController');
const login = require('../controllers/userLoginController');
const newComer = require('../controllers/newComersController');
const logoutUser = require('../controllers/logoutController');
const getLogin = require('../controllers/getLoginController');

//Routes to handle HTTP Requests
router.get('/', newComer.redirect)
router.get('/home', isLoggedIn, selectQuery.getAllUsers)
router.post('/add', isLoggedIn, addQuery.addWork);
router.post('/delete/:id', isLoggedIn, deleteQuery.deleteWork);
router.post('/update/:id', isLoggedIn, updateQuery.updateWork );
router.post('/logout', isLoggedIn, logoutUser.logout);
router.post('/login-', login.userLogin);
router.get('/login', getLogin.getLoginPage);
router.get('/signup');


module.exports = router;