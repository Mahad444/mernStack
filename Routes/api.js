const express = require('express');
const controllers = require('../Controllers/logic')
const {verifyAccesToken} =require ('../Authentication/jwthelper')

const routes = express.Router();


routes.post('/register', controllers.customer);
routes.post('/menu', controllers.menu);
routes.get('/see' ,verifyAccesToken);
routes.post('/access', controllers.access);
routes.post('/grant', controllers.grant);
routes.post('/login', controllers.login);





module.exports = routes