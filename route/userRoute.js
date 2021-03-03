const express = require('express');
const { createUser } = require('../controller/userController');
const route = express.Router();

route.post('/create-account', createUser);

module.exports = route;