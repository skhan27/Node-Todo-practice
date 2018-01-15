/* 
    Set up user model and methods. user must have a valid email and a password that is atleast 6 characters long. Tokens is an array for the different tokens for each user (in the case of multiple log ins)
*/

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            isAsync: false,
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'     
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token:{
            type: String,
            required: true
        }
    }]
});

//Return the id and email of the user from all the other details stored in the DB
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject =  user.toObject();
    return _.pick(userObject, ['_id', 'email'])
};

//creates an authentication token for the user. JWT_SECRET is an environment variable set in config.json or on the production machine. returns the newly generated token
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
};

//removes the provided token from the tokens array for 'logging out'
UserSchema.methods.removeToken = function (token) {
    var user = this;

    return user.update({
        $pull: {
            tokens: {
                token: token
            }
        }
    });
};

//finds the user using the token provided. 
UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch(e){
        // return new Promise((resolve, reject) => {
        //     reject();
        // });
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};


//salts and hashes the password prior to saving the user to the database
UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        //password = user.password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                
                user.password = hash;
                next();
            });
        });
    }else {
        next();
    }
});

//finding a user by email and password. If there is a user with the email provided, the password is then compared to the salted and hashed password using the compare function provided by bcrypt
UserSchema.statics.findByCredentials = function(email, password) {
    var User = this;
     return User.findOne({email}).then((user) => {
        if (!user){
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
};


var User = mongoose.model('User',UserSchema);

module.exports = {User};