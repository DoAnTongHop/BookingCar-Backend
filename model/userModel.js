const Joi = require('joi');
const mongoose = require('mongoose');

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