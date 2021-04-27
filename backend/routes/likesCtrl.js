// Imports
var models   = require('../models');
var jwtUtils = require('../utils/jwt.utils');
var asyncLib = require('async');

// Constants
const DISLIKED = 0;
const LIKED    = 1;

// Routes
module.exports = {
  likePost: function(req, res) {
    // Getting auth header
    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);

    // Params
    var topicId = parseInt(req.params.topicId);

    if (topicId <= 0) {
      return res.status(400).json({ 'error': 'invalid parameters' });
    }

    asyncLib.waterfall([
      function(done) {
        models.Topic.findOne({
          where: { id: topicId }
        })
        .then(function(topicFound) {
          console.log(topicFound)
          done(null, topicFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify topic' });
        });
      },
      function(topicFound, done) {
        if(topicFound) {
          models.User.findOne({
            where: { id: userId }
          })
          .then(function(userFound) {
            done(null, topicFound, userFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
          });
        } else {
          res.status(404).json({ 'error': 'topic doesnt exists' });
        }
      },
      function(topicFound, userFound, done) {
        if(userFound) {
          models.Like.findOne({
            where: {
              userId: userId,
              topicId: topicId
            }
          })
          .then(function(userAlreadyLikedFound) {
            done(null, topicFound, userFound, userAlreadyLikedFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify is user already liked' });
          });
        } else {
          res.status(404).json({ 'error': 'user not exist' });
        }
      },
      function(topicFound, userFound, userAlreadyLikedFound, done) {
        if(!userAlreadyLikedFound) {
            models.Like.create({
                topicId: topicFound.id,
                userId: userFound.id,
                isLike: LIKED,
            })
          .then(function () {
            topicFound.update({
                likes: topicFound.likes + 1,
              }).then(function() {
                done(topicFound);
              }).catch(function(err) {
                res.status(500).json({ 'error': 'cannot update topic like counter' });
              });
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to set user reaction' });
          });
        } else {
          if (userAlreadyLikedFound.isLike === DISLIKED) {
            userAlreadyLikedFound.update({
              isLike: LIKED,
            }).then(function() {
                topicFound.update({
                    likes: topicFound.likes + 1,
                  }).then(function() {
                    done(topicFound);
                  }).catch(function(err) {
                    res.status(500).json({ 'error': 'cannot update topic like counter' });
                  });
            }).catch(function(err) {
              res.status(500).json({ 'error': 'cannot update user reaction' });
            });
          } else {
            userAlreadyLikedFound.update({
                isLike: DISLIKED,
              }).then(function() {
                topicFound.update({
                    likes: topicFound.likes - 1,
                  }).then(function() {
                    done(topicFound);
                  }).catch(function(err) {
                    res.status(500).json({ 'error': 'cannot update topic like counter' });
                  });
              }).catch(function(err) {
                res.status(500).json({ 'error': 'cannot update user reaction' });
              });    
          }
        }
      },
    ], function(topicFound) {
      if (topicFound) {
        return res.status(201).json(topicFound);
      } else {
        return res.status(500).json({ 'error': 'cannot update topic' });
      }
    });
  },
  getUserLikeStatus: function(req, res) {
    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);

    models.User.findOne({
      where: { id: userId }
    }).then(function(userFound) {
      models.Like.findAll({
        where: {
          userId: userFound.id
        }
      }).then(function(likeStatus) {
        res.status(200).json(likeStatus)
      }).catch (function(err) {
        res.status(404).json({ 'error': 'cannot find user like status' });
      })
    }).catch(function(err) {
      res.status(404).json({ 'error': 'user cant be found' });
    })
  }
}