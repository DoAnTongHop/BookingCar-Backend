const bcrypt = require('bcrypt');
const { User, userValidate } = require('../model/userModel');


//[POST] /create-account
exports.createUser = async (req, res) => {
    const phone = req.body.phone;

    let user = await User.findOne({ phone: phone })
    if (user) return res.send({ error: true, message: 'User already exists' })

    const { error } = userValidate(req.body);
    if (error) return res.send({ error: true, message: 'Have error with data form' });

    user = new User({
        email: req.body.email,
        phone: phone,
        password: req.body.password,
        fullname: req.body.displayName,
    })
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    res.send({ error: false });
}