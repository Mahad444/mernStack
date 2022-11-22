const express = require('express');
const controllers = require('../Controllers/customer')

const routes = express.Router();


routes.post('/register', controllers.customer)





module.exports = routes