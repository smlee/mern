/**
 * Transpile ES7 and ES6 to ES5
 */
'use strict';

require('babel/register');

var chalk = require('chalk');
var startDB = require('./db');

var startServer = function(){
    var port = process.env.PORT || 3000;
    var app = require('./app');
    app.listen(port, function() {
        console.log(chalk.green('Server started on port:'), chalk.yellow.bold(port))
    })
};

startDB.then(startServer)
    .catch(function(err) {
        console.err(chalk.red(err.stack));
        process.kill(1);
    });

