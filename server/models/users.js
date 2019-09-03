const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const crypto = require("crypto");
const Schema = mongoose.Schema;

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

userSchema.pre('save',function(next){
    var user = this;
    if(!user.isModified('password')) return next();
    bcrypt.hash(user.password, null, null, function(err, hash) {
     if(err) return next(err);
     user.password = hash;
     return next();
    });
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password,this.password);
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
