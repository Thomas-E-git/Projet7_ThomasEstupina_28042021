var express = require('express');
var usersCtrl = require('./routes/usersCtrl');
var topicCtrl = require('./routes/topicsCtrl');
var likesCtrl = require('./routes/likesCtrl');


exports.router = (function() {
    var apiRouter = express.Router();

    apiRouter.route('/users/signup/').post(usersCtrl.signup);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/me/').get(usersCtrl.getUserProfile);
    apiRouter.route('/users/me/').put(usersCtrl.updateUserProfile);
    apiRouter.route('/users/:userId/').get(usersCtrl.getOthersProfile);

    apiRouter.route('/topics/new/').post(topicCtrl.createTopic);
    apiRouter.route('/topics/').get(topicCtrl.listTopics);

    apiRouter.route('/topics/:topicId/vote/like').post(likesCtrl.likePost);

    return apiRouter;
})();