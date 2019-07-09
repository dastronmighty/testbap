"use strict";

const userController = require('../controllers/UserController');

const prefix = "/api/auth"

module.exports = (app) => {

    app.post(`${prefix}/register`, userController.addUser);
    app.post(`${prefix}/login`, userController.login);
    app.post(`${prefix}/register2`, userController.addUserQ)

}