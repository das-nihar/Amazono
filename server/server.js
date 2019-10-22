const express = require('express'); // it's a framework to create http routes
const bodyParser = require('body-parser'); // request logger for node js, it's a middleware
const morgan = require('morgan'); // Data reader, It enables node js to read the frontend data
const mongoose = require('mongoose'); // It is used to connect to the mongo db 
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
app.use(bodyParser.json()); // Reading the data in json format
app.use(bodyParser.urlencoded({extended: false})); // is false because we want read image data in future
app.use(morgan('dev')); // It will log the details in the terminal
app.use(cors());

const userRoutes = require('./routes/account');
app.use('/api/accounts', userRoutes);

app.listen(config.port,(err) => {
    console.log('Listening in port '+ config.port);
});
