const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const app = express();

mongoose.connect(config.database, (err) => {
    if(err) {
        console.log(err);
    } else {
       console.log('Connected to the database');
    }
}); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req,res,next) => {
    res.json({
        'name': 'Nihar'
    });
}); 
app.listen(config.port,(err) => {
    console.log('Listening in port '+ config.port);
});
