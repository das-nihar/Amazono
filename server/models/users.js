const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs"); // It encrypts any string
const crypto = require("crypto");
const Schema = mongoose.Schema; // It is an object to create user blueprint

const userSchema = new Schema ({
    email: {type: String, unique: true, lowercase: true},
    name: String,
    password: String,
    picture: String,
    isSeller: {type: Boolean, default: false},
    address: {
       addr1: String,
       addr2: String,
       city: String,
       state: String,
       country: String,
       postalCode: String
    },
    created: {type: Date, default: Date.now}
});

userSchema.pre('save',function(next){ // pre() here will encrypt the password before saving
    var user = this;
    if(!user.isModified('password')) return next();
    bcrypt.hash(user.password, null, null, function(err, hash) { // function to encrypt the password
     if(err) return next(err);
     user.password = hash;
     return next();
    });
});

userSchema.methods.comparePassword = function(password) { // creating a custom method to compare passwords
    return bcrypt.compareSync(password,this.password); // it compares the password you typed in to the password in db
}

userSchema.methods.gravatar = function(size) {
    if(!this.size) size = 200;
    if(!this.email) {
        return  ;
    } else {
        var md5 = crypto.createHash('md5').update('nrdas95@gmail.com').digest('hex');
        return 'https://gravatar.com/avatar/' + md5 + '?s' + size + '&d=retro';

    }
}

module.exports = mongoose.model('Users', userSchema);
