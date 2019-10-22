const jwt = require('jsonwebtoken');
const config = require('../config');


module.exports = function(req,res,next) {
    let token = req.header['authorization'];

    if(token) {
        jwt.verify(token, config.secret, function(err, decoded){ // checking the expiry date of the jwt token
        if(err) {
            res.json({
                success: false,
                message: 'Failed to authenticate token'
            })
        } else {
            req.decoded = decoded; // it decrypts the token and make the details available to access
            next();
        }
        })
    } else {
        res.status(403).json({
            success: false,
            message: 'No token provided'
        })
    }
}