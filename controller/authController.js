const bcrypt = require('bcrypt');
const Joi = require('joi');

const { User } = require('../model/userModel');

exports.login = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.send({
        error: true,
        message: 'Validate'
    });

    const user = await User.findOne({ phone: req.body.phone.toLowerCase() });
    if (!user) return res.send({
        error: true,
        message: 'User not readly exits'
    });

    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) return res.send({
        error: true,
        message: 'Password wrong'
    });

    const token = user.generateAuthToken();
    res.send({
        error: false,
        data: {
            token: token,
            user: {
                _id: user._id,
                phone: user.phone,
                fullname: user.fullname
            }
        }
    });
}

function validate(userLogin) {
    const scheme = Joi.object({
        phone: Joi.number().required(),
        password: Joi.string().required().min(6),
    })
    return scheme.validate(userLogin);
}