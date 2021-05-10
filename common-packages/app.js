//changing colors
const chalk = require('chalk');

//sending HTTP requests
const axios = require('axios');

//Handle command line arguements easier
const commander = require('commander');
const { option } = require('commander');

// console.log('Without Chalk');
// console.log(chalk.red('This is With Chalk'));
// console.log(chalk.red.inverse('This is With Chalk Inverse'));

commander
    .option('-t, --type <type>', 'lookup type')
    .option('-i, --id <id>', 'Anime/Manga ID')
    .parse(process.argv);

//Note to self: you got this from documentation not the course
const options = commander.opts();
// console.log(`${options.type}`);


//get data from a url (using Jikan API)
axios.get(`https://api.jikan.moe/v3/${options.type}/${options.id}`)
    .then(results => 
    {
        console.log(results.data);
    })
    .catch(error =>
    {
        console.log(chalk.red.inverse(error));
    });

//try running from terminal with 'node app -t anime -i {number}' or ' node app -t manga -i {number}'