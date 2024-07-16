const express = require('express');
const app = express();
const workRouter = require('../routes/work.route');
const session = require('express-session');

//define middlewares
app.use( express.urlencoded( { extended: true } ) );
app.use(express.static('static'));
app.use(express.json());
app.use(session({
    secret: 'admin',
    resave: false,
    saveUninitialized: false,
}));




//define view engine
app.set("view engine", "ejs");

//define routers
app.use('/', workRouter);

app.listen(8081, () => {
    console.log("listening...");
});