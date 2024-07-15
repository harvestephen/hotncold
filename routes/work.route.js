const express = require('express');
const router = express.Router();
const db = require("../config/db");

//Http Controllers
const selectQuery = require('../controllers/workSelectController');
const addQuery = require('../controllers/workAddController');
const deleteQuery = require('../controllers/workDeleteController');
const updateQuery = require('../controllers/workUpdateController');

//Routes to handle HTTP Requests
router.get('/', selectQuery.getAllUsers)
router.post('/', addQuery.addWork);
router.post('/:id', deleteQuery.deleteWork);
router.post('/update/:id',updateQuery.updateWork );


module.exports = router;