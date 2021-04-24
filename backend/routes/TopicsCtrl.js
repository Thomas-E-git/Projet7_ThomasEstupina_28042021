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
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
      return res.status(400).json({ 'error': 'invalid parameters' });
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
          console.log(userFound.id);
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
      sequelize.query("SELECT Topic.id, Topic.title, Topic.content, Topic.attachment, Topic.likes, Topic.createdAt, Topic.updatedAt, Topic.UserId, Creator.username FROM Topics AS Topic LEFT OUTER JOIN Users AS Creator ON Topic.UserId = Creator.id" ,{type: Sequelize.QueryTypes.SELECT} )
    .then(function(topics) {
      console.log(topics)
      if (topics) {
        res.status(200).json(topics);
      } else {
        res.status(404).json({ "error": "no topics found" });
      }
    }).catch(function(err) {
      console.log(err);
      res.status(500).json({ "error": "invalid fields" });
    });
  }
}