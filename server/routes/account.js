const exp = require('express');
const router = exp.Router();
const jwt = require('jsonwebtoken');
const config = require('../config')
const User = require('../models/users');
const checkJwt = require('../middlewares/check-jwt')

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
router.route('/profile')
.get(checkJwt,(req, res, next) => {
    User.findOne({_id: req.decoded.user._id},(err, user) =>{
        res.json({
            success: true,
            user: user,
            message: 'Successful'
        });
    });
})
.post(checkJwt, (req, res, next) => {
    User.findOne({_id: req.decoded.user._id},(err,user) => {
        if (err) {
         return next(err);
        }
        if (req.body.name) {
            user.name = req.body.name;
        }
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.password) {
            user.password = req.body.password;
        }

        user.isSeller = req.body.isSeller;
        user.save();
        res.json({
            success: true,
            message: 'Successfully edited your profile'
        });
    });
});

router.route('address')
.get(checkJwt,(req,res,next) => {
    User.findOne({_id: req.decoded.user._id}, (err, user) => {
        res.json({
            success: true,
            address: user.address,
            message: 'Successful'
        });
    });
})
.post(checkJwt, (req, res, next) => {
    User.findOne({_id: req.decoded.user._id}, (err, next) => {
        if (err) {
            return next(err);
        }

        if (req.body.addr1) {
            user.address.addr1 = req.body.addr1;
        }
        if (req.body.addr2) {
            user.address.addr2 = req.body.addr2;
        }
        if (req.body.city) {
            user.address.city = req.body.city;
        }
        if (req.body.state) {
            user.address.state = req.body.state;
        }
        if (req.body.country) {
            user.address.country = req.body.country;
        }
        if (req.body.postalCode) {
            user.address.postalCode = req.body.postalCode;
        }
        user.save();
        res.json({
            success: true,
            message: 'Successfully edited your address'
        });
    })
})

module.exports = router;