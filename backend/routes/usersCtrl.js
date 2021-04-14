const bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');

var models = require('../models');

module.exports = {
    signup: function(req, res, next) {
        //var re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,})$/;
        //var password = req.body.password;
        //if (re.test(password)) {    
        // hash du mot de passe utilisateur avec bcrypt //
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var department = req.body.department;

        if (email == null || username == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
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
                return res.status(409).json({ 'error': 'user already exist' });
                }
            })
        .catch(error => res.status(500).json({ error }));
    },
        //}
    //else (res.status(400).json({ message: "le mot de passe doit contenir au moins 8 caractères, avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial" }))

    login: function(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
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
                return res.status(404).json({ 'error': 'user not exist in DB'});
            }
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user'});
        });
    }
}