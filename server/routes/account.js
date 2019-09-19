const exp = require('express');
const router = exp.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/users');

router.post('/signup', (req, res, next) => {
    console.log(req.body);
});

module.exports = router;