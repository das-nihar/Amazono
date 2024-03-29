const exp = require('express');
const router = exp.Router();
const jwt = require('jsonwebtoken');
const config = require('../config')
const User = require('../models/users');

router.post('/signUp', (req, res, next) => {
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

router.post('/signIn',(req,res,next) => {



    User.findOne({email:req.body.email}, (err, user) => {
     
        if(err) {
            throw err;
        }
        if (!user) {
            res.json({
                success: false,
                message: 'Authentication failed, User not found'
            });
        } else if (user) {
            console.log(req.body.password);
            
            var validPassword = user.comparePassword(req.body.password);
            if(!validPassword) {
                res.json({
                    success: false,
                    message: 'Authentication failed, wrong password'
                });
            } else {
                var token = jwt.sign(
                   {
                    user: user
                   },
                    config.secret,
                   {
                    expiresIn: '7d'
                   });
                res.json({
                    success: true,
                    messase: 'Enjoy your token',
                    token: token
                });
            }
        }
    });
});

module.exports = router;