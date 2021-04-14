var express = require('express');
var usersCtrl = require('./routes/usersCtrl');

exports.router = (function() {
    var apiRouter = express.Router();

    apiRouter.route('/users/signup/').post(usersCtrl.signup);
    apiRouter.route('/users/login/').post(usersCtrl.login);

    return apiRouter;
})();