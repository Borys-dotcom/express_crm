const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");


const User = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    actions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Actions"
    }]
})

User.pre('save', function(next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            res.send(err);
            return next();
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                res.send(err)
                return next();
            }

            user.password = hash;
            next();
        })
    })
})

User.methods.generateAuthToken = (user) => {
    const token = jwt.sign({_id: user._id}, config.tokenKey, {expiresIn: "1h"});
    return token;
}

module.exports = mongoose.model("User", User)