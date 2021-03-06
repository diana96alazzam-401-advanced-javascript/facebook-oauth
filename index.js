'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const user = require('./model.js')
const fetch = require('node-fetch');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


app.use(cors());
app.use('/', express.static('./public'));
app.use(bodyParser.json());
app.post('/login-with-facebook', async (req, res)=> {
    console.log('hello');
    const {accessToken, userID} = req.body;    
    const response = await fetch(`https://graph.facebook.com/v7.0/me?access_token=${accessToken}&method=get&pretty=0&sdk=joey&suppress_http_code=1`);
    const json = await response.json()
    if(json.id === userID){
        //valid user
        // check if the user exists in db else register and then login
        const resp = await user.findOne({facebookID:userID});
        if(resp){
            //user is registered then create a session
            res.json({status: 'ok', data: 'you are logged in'})
        } else {
            const person = new user({
                name: 'something',
                facebookID: userID,
                accessToken
            })

            await person.save();

            res.json({status: 'ok', data: 'you are registered and logged in'});
        }
    }else {
        // invalid user warning
        res.json({status: 'error', data: 'stop'});
    }
})
// Start the web server
// require('./src/app.js').start(process.env.PORT);

app.listen(process.env.PORT, ()=> console.log(`up and running on port ${process.env.PORT}`));
