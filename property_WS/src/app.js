const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/routing');

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use('/',router);


app.listen(1050);
console.log("server has started");

module.exports = app;