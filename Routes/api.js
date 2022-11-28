const express = require('express');
const controllers = require('../Controllers/logic')

const routes = express.Router();


routes.post('/register', controllers.customer);
routes.post('/login', controllers.login);
routes.post('/menu', controllers.menu);
routes.get('/menu', controllers.menusee);
routes.post('/access', controllers.access);
routes.post('/grant', controllers.grant);





module.exports = routes