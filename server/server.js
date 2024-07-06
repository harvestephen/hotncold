const express = require('express');
const app = express();
const workRouter = require('../routes/work.route');

//define middlewares
app.use( express.urlencoded( { extended: true } ) );

//define view engine
app.set("view engine", "ejs");

//define routers
app.use('/users', workRouter);

app.listen(8081, () => {
    console.log("listening...");
});