const exp = require('express');
const router = exp.Router();
const jwt = require('jsonwebtoken');
const config = require('../config')
const User = require('../models/users');

router.post('/signup', (req, res, next) => {
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password; 
    user.picture = user.gravatar();
    user.isSeller = req.isSeller

User.findOne({email: req.body.email}, (err, existingUser) => { // findOne is a method of mongoose to find whether the details are already existing in db or not
    if(existingUser) {
        res.json({
            success: false,
            message: 'Account with that user already exist'
        });
    } else {
        user.save(); // Method of mongoose to save to db

        var token = jwt.sign({
            user: user
        }, config.secret, {
            expiresIn: '7d'
        });
        res.json({
            success: true,
            message: 'Enjoy your token',
            token: token
        });
    }
});
});

module.exports = router;