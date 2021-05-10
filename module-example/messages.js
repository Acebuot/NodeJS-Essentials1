const chalk = require('chalk');

const error = (msg) =>
{
   console.log(chalk.red(msg)); 
};

const success = (msg) =>
{
   console.log(chalk.green(msg)); 
};

//export it and make usable for other files to use
module.exports = {
    error,
    success
}