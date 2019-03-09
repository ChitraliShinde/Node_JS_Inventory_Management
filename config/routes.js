var RegistrationController = require('../controller/RegisterController');
var DashboardController = require('../controller/DashboardController');

var passport = require('passport');
var request = require('request');

module.exports = function (app, passports) {

    app.get('/registration', RegistrationController.registerview);
    app.post('/register', RegistrationController.register);
    app.get('/login', RegistrationController.loginview);
    app.post('/logincheck', RegistrationController.logincheck)
    app.get('/logout', RegistrationController.logout);

    app.get('/dashboard', DashboardController.dashboard);
    app.get('/viewproducts', DashboardController.view);
    app.get('/addproduct', DashboardController.add);
    app.post('/saveproduct', DashboardController.save);
    app.get('/editproduct/:id', DashboardController.add);
    app.post('/updateproduct/:id', DashboardController.update);
    app.get('/deleteproduct/:id', DashboardController.delete);

};
