const bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');
var asyncLib = require('async');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,})$/;

module.exports = {
    signup: function(req, res, next) {
    
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var department = req.body.department;


        if (email == null || username == null || password == null) {
            return res.status(400).json({ 'error': 'Missing parameters' });
        }

        if (username.length >= 30 || username.length <= 4) {
            return res.status(400).json({ 'error' : 'Username must have between 5 and 12 characters' });
        }

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ 'error': 'Email is not valid' })
        }

        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({ 'error': 'Password is not valid, should have at least 8 caracters, containing at least one uppercase, one number and one special character' })
        }

        models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
        .then(function(userFound) {
            if (!userFound) {
                bcrypt.hash(password, 10, function(err, bcryptedPassword) {
                    var newUser = models.User.create({
                        email: email,
                        username: username,
                        password: bcryptedPassword,
                        department: department,
                        isAdmin: 0
                })
                .then(function(newUser) {
                    return res.status(201).json({
                        'userId': newUser.id
                    })
                })
                .catch(error => res.status(500).json({ error }));
            });
            } else {
                return res.status(409).json({ 'error': 'User already exist' });
                }
            })
        .catch(error => res.status(500).json({ error }));
    },

    login: function(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({ 'error': 'Missing parameters' });
        }

        models.User.findOne({
            where: { email: email }
        })
        .then(function(userFound) {
            if (userFound) {
                bcrypt.compare(password, userFound.password, function(errBcrypt, resBcrypt) {
                    if(resBcrypt) {
                        return res.status(200).json({
                            'userId': userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
                    } else {
                        return res.status(403).json({ "error": "invalid password" });
                    }
                });
            } else {
                return res.status(404).json({ 'error': 'User not exist in DB'});
            }
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user'});
        });
    },
    getUserProfile: function(req, res) {
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0)
            return res.status(400).json({ 'error': 'wrong token' });

        models.User.findOne({
            attributes: ['id', 'email', 'username', 'department'],
            where: { id: userId }
        })
        .then(function(user) {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json({ 'error': 'user not found' });
            }
        })
        .catch(function(err) {
            res.status(500).json({ error });
        });
    },
    updateUserProfile: function(req, res) {
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        var department = req.body.department;

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                    attributes: ['id', 'department'],
                    where: { id: userId }
                }).then(function(userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'unable to verify user' });
                });
            },
            function(userFound, done) {
                if(userFound) {
                    userFound.update({
                        department: (department ? department : userFound.department)
                    }).then(function() {
                        done(userFound);
                    }).catch(function(err) {
                        res.status(500).json({ 'error': 'cannot update department of user' });
                    });
                } else {
                    res.status(404).json({ 'error': 'user not found for update' });
                }
            },
        ], function(userFound) {
            if(userFound) {
                return res.status(201).json(userFound);
            } else {
                return res.status(500).json({ 'error': 'cannot update user profile' })
            }
        });
    }
}