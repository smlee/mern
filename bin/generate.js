/**
 * Created by Sang on 8/7/2015.
 */
var Promise = require('bluebird');
var path = require('path');
var chalk = require('chalk');
var ncp = Promise.promisify(require('ncp').ncp);
var rename = Promise.promisify(require('fs').rename);
var mkdir = Promise.promisify(require('mkdir-p'));

ncp.limit = 16;

var newProjectDir = process.argv[2] || process.cwd();
var generatorFilesPath = path.join(__dirname, '../mernFiles');

var renameBabelrc = function () {
    var oldPath = path.join(newProjectDir, 'babelrc.txt');
    var newPath = path.join(newProjectDir, '.babelrc');
    return rename(oldPath, newPath);
}

var renameGitignore = function () {
    var oldPath = path.join(newProjectDir, 'gitignore.txt');
    var newPath = path.join(newProjectDir, '.gitignore');
    return rename(oldPath, newPath);
};

var renameGitattributes = function () {
    var oldPath = path.join(newProjectDir, 'gitattributes.txt');
    var newPath = path.join(newProjectDir, '.gitattributes');
    return rename(oldPath, newPath);
};

var cpFiles = function () {
    return ncp(generatorFilesPath, newProjectDir)
        .then(renameBabelrc)
        .then(renameGitignore)
        .then(renameGitattributes)
        .then(function() {
        console.log(
            chalk.blue("It's ready!"),
            chalk.magenta('But don\'t forget to:')
        );
        console.log(chalk.white.bgBlue('> npm install'));
        console.log(chalk.white.bgBlue('> gulp'));
        console.log(chalk.red('In another terminal...'));
        console.log(chalk.white.bgBlue('> npm start'));
    }).catch(function(err){
            console.log(chalk.red(err.stack));
        });
};



console.log(chalk.cyan('Your MERN stack skeleton is generating'));

if (process.argv[2]) {
    mkdir(newProjectDir).then(function(){
        console.log(chalk.white.bgGreen('Project path:'), newProjectDir);
        cpFiles();
    }).catch(function(){
        console.log(process.argv[2], chalk.red('can\'t be created'));
    });
} else {
    console.log(chalk.white.bgGreen('Project path:'), newProjectDir);
    cpFiles();
}