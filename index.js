const express = require('express');
const app = express();
const workRouter = require('./routes/work.route');
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
app.set('views','views');

//define routers
app.use('/', workRouter);

const PORT = 8081;

app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
});