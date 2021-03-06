var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
require('dotenv').config();

const { createConnection } = require('mysql');
const { Console } = require('winston/lib/winston/transports');
const database = createConnection({
    host: 'localhost',
    user: process.env.DBUSER_NAME,
    password: process.env.DBUSER_PASS,
    database: 'dmbot',
});

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: process.env.SECRET_TOKEN,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');

    database.connect(function(err){
        if (err) throw err;
        console.log("Connected to dmbot_db");
    });
});

bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Hello World'
                });
                break;


         }
     }
});