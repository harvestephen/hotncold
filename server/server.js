const express = require('express');
const app = express();
const workRouter = require('../routes/work.route');

app.set("view engine", "ejs");

app.use('/users', workRouter);

app.listen(8081, () => {
    console.log("listening...");
});