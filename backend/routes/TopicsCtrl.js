// Imports
var models   = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database_development', 'openclassrooms', 'openclassrooms', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    multipleStatements: true
  }
});

// Constants
const TITLE_LIMIT   = 1;
const CONTENT_LIMIT = 3;

// Routes
module.exports = {
  createTopic: function(req, res) {
    // Getting auth header
    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);

    // Params
    var title   = req.body.title;
    var content = req.body.content;

    if (title == null || content == null) {
      return res.status(400).json({ message: 'Sections cannot be empty' });
    }

    if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
      return res.status(400).json({ message: 'Missing characters' });
    }

    asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          where: { id: userId }
        })
        .then(function(userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if(userFound) {
          models.Topic.create({
            title  : title,
            content: content,
            likes  : 0,
            UserId : userFound.id,
            Username : userFound.username,
          })
          .then(function(newTopic) {
            done(newTopic);
          });
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      },
    ], function(newTopic) {
      if (newTopic) {
        return res.status(201).json(newTopic);
      } else {
        return res.status(500).json({ 'error': 'cannot post Topic' });
      }
    });
  },
  listTopics: function(req, res) {
      sequelize.query("SELECT Topic.id, Topic.title, Topic.content, Topic.attachment, Topic.likes, Topic.createdAt, Topic.updatedAt, Topic.UserId, Creator.username FROM Topics AS Topic LEFT OUTER JOIN Users AS Creator ON Topic.UserId = Creator.id ORDER BY Topic.createdAt DESC" ,{type: Sequelize.QueryTypes.SELECT} )
    .then(function(topics) {
      if (topics) {
        res.status(200).json(topics);
      } else {
        res.status(404).json({ "error": "no topics found" });
      }
    }).catch(function(err) {
      res.status(500).json({ "error": "invalid fields" });
    });
  },

  getTopicLikesUsernames: function(req, res) {
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);
    var topicId = parseInt(req.params.topicId);

    if (userId < 0)
      return res.status(400).json({ 'error': 'wrong token' });

        asyncLib.waterfall([
          function(done) {
            models.Topic.findOne({
              where: { id: topicId }
            })
            .then(function(topicFound) {
              done(null, topicFound);
            })
            .catch(function(err) {
              return res.status(500).json({ 'error': 'unable to verify topic' });
            });           
          },
          function(topicFound, done) {
            models.User.findOne({
              where: { id: userId }
            })
            .then(function(userFound) {
              done(null, topicFound, userFound);
            })
            .catch(function(err) {
              return res.status(500).json({ 'error': 'topic not exist' });
            });
          },
          function(topicFound, userFound, done) {
            if(userFound) {
              models.Topic.findAll({
                include: [{
                    model: models.User,
                    attributes: ['username'],
                  }],
                where: {
                    id: topicFound.id
                },
              }).then(function(likesFound) {
                done(likesFound)  
              }).catch(function(err) {
                res.status(500).json({ 'error': 'cannot get topic' })
              });
            } else {
              return res.status(500).json({ 'error': 'User not exist' });
            }    
          }
        ],function(likesFound) {
          if(likesFound) {
              return res.status(201).json(likesFound);
          } else {
              return res.status(500).json({ 'error': 'cannot get topic likes' })
          }
        }
      )
  },

  deleteTopic : function(req, res) {
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);
    var topicId = parseInt(req.params.topicId);

    if (userId < 0)
      return res.status(400).json({ 'error': 'wrong token' });

        asyncLib.waterfall([
          function(done) {
            models.Topic.findOne({
              where: { 
                id: topicId,
                userId : userId
              }
            })
            .then(function(topicFound) {
              done(null, topicFound);
            })
            .catch(function(err) {
              return res.status(500).json({ 'error': 'unable to verify user topic' });
            });           
          },
          function(topicFound, done) {
            if(topicFound) {
              models.Topic.destroy({
                where: {
                    id: topicFound.id
                },
              }).then(function(topicFound) {
                done(topicFound)  
              }).catch(function(err) {
                res.status(500).json({ 'error': 'unable to destroy topic' })
              });
            } else {
              return res.status(500).json({ 'error': 'cannot find topic' });
            }    
          }
        ],function() {
          return res.status(200).json({'message': 'post has been deleted'})
        }
        
      )
  },

  updateTopic : function(req, res) {
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);
    var topicId = parseInt(req.params.topicId);

    var title = req.body.title;
    var content = req.body.content;
    var attachment = req.body.attachment;

    if (title.length <= TITLE_LIMIT && title.length !== 0) {
      return res.status(400).json({ message: 'invalid title' });
    }
    if (content.length <= CONTENT_LIMIT && content.length !== 0) {
      return res.status(400).json({ message: 'invalid content' });
    }

    if (userId < 0)
      return res.status(400).json({ 'error': 'wrong token' });
        asyncLib.waterfall([
          function(done) {
            models.Topic.findOne({
              where: { 
                id: topicId,
                userId : userId
              }
            })
            .then(function(topicFound) {
              done(null, topicFound);
            })
            .catch(function(err) {
              return res.status(500).json({ 'error': 'unable to verify user topic' });
            });           
          },
          function(topicFound, done) {
            if(topicFound) {
              topicFound.update({
                  title: (title ? title : topicFound.title),
                  content: (content ? content : topicFound.content),
                  attachment: (attachment ? attachment : topicFound.attachment)
              }).then(function() {
                done(topicFound)  
              }).catch(function(err) {
                res.status(500).json({ 'error': 'cannot update topic' })
              });
            } else {
              return res.status(500).json({ 'error': 'topic not found for update' });
            }    
          }
        ],function(topicFound) {
          if(topicFound) {
              return res.status(201).json(topicFound);
          } else {
              return res.status(500).json({ 'error': 'cannot get topic' })
          }
      });
  }
}