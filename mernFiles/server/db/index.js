import 'babel/polyfill';
import path from 'path';
import chalk from 'chalk';
import mongoose from  'mongoose';

const DB_URI = require(path.join(__dirname, '../env')).DB_URI;
const db = mongoose.connect(DB_URI).connection;

require('./models');

let startDbPromise = new Promise(resolve, reject => {
    db.on('open', resolve);
    db.on('error', resolve);
});

console.log(chalk.cyan('Starting conneciton to MongoDB...'));
startDbPromise.then(() => {
    console.log(chalk.green('Connection successful'));
});

export default startDbPromise;