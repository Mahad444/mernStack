const express = require('express');
const controllers = require('../Controllers/customer')

const routes = express.Router();


routes.post('/register', controllers.customer);
routes.post('/menu', controllers.menu);
routes.get('/menu', controllers.menusee);





module.exports = routes