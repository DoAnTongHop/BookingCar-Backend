const express = require('express');
const { login } = require('../controller/authController');
const route = express.Router();

route.post('/', login);

module.exports = route;