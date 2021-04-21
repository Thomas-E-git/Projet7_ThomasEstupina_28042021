var models = require('../models');
var asyncLib = require('async');
const jwtUtils = require('../utils/jwt.utils');

const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 5;

module.exports = {
    createTopic: function(req, res) {
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        var title = req.body.title;
        var content = req.body.content;

        if (title == null || content == null) {
            return res.status(400).json({ 'error': 'missing parameters' })
        }

        if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
            return res.status(400).json({ 'error': 'title and content should respectively have at least 2 and 5 characters' })
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
                if (userFound) {
                    models.Topic.create({
                        title: title,
                        content: content,
                        likes: 0,
                        UserId: userFound.id
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
                return res.status(500).json({ 'error': 'connot post topic' });
            }               
        });
    },
    listTopics: function(req, res) {

        var fields = req.query.fields;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order = req.query.order;

        
       
            
        models.Topic.findAll({
            order: [(order != null) ? order.split(':') : ['title', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: [ 'username' ]
            }]          
        }).then(function(topics) {
            if (topics) {
                res.status(200).json(topics);
            } else {
                res.status(404).json({ "error": "no topis found" });
            }
        }).catch(function(err) {
            console.log(err);
            res.status(500).json({ "error": "invalid fields" })
        })  
    }
}