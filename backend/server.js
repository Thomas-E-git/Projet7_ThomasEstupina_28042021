var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;

var server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

server.use('/api/', apiRouter);

server.listen(8080, function() {
    console.log('Server en écoute');
})