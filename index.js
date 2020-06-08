'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use('/', express.static('./public'));
app.use(bodyParser.json());
app.post('/login-with-facebook', (req, res)=> {
    const {accessToken, userID} = req.body;
})
// Start the web server
// require('./src/app.js').start(process.env.PORT);

app.listen(process.env.PORT, ()=> console.log(`up and running on port ${process.env.PORT}`));
