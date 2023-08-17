const express = require('express');
const { createUser, login } = require('../controllers/user');
const authRout = express.Router();

authRout.route('/register').post(createUser)

authRout.route('/login').post(login)

module.exports = authRout;