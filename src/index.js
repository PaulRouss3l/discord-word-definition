const Discord = require('discord.js');
const auth = require('../build/auth.json');

const command = require('./command.js');
const Game = require('./game/index.js');

// Initialize Discord Bot
var client = new Discord.Client();

client.on('ready',  () => {
    console.log('Connected');
});

client.on('message', message => {
    var test = message;
    if (message.author.bot) {
        return;
    }

    let command_result = command.check_command(client, message);

    if (command_result) {
        return;
    }
    
    Game.check_game_state(client, message);
});

client.login(auth.token);
