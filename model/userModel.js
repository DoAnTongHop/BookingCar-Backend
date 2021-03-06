const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userScheme = new mongoose.Schema({
    fullname: String,
    // Dùng phone làm tài khoản login
    phone: String,
    password: String,
    email: String,
    type: {
        type: String,
        default: '1'
    }
});

userScheme.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
        fullname: this.fullname,
        image: this.image,
        imageCover: this.imageCover
    },
        process.env.SECRET_KEY)
    return token;
}

const User = mongoose.model('User', userScheme);

function userValidate(user) {
    const scheme = Joi.object({
        fullname: Joi.string(),
        phone: Joi.string().required(),
        email: Joi.string(),
        password: Joi.string().required().min(6).max(50),
        type: Joi.string(),
    })
    return scheme.validate(user);
};

exports.User = User;
exports.userValidate = userValidate;