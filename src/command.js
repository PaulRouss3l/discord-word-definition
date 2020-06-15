const create_game = require('./command/game.js');
const rules = require('./command/rules.js');
const next_word = require('./command/next_word.js');

/*  */
var command_list = {
    'word-definition': create_game,
    'rules': rules,
    'next_word': next_word,
}

module.exports.check_command = function check_command(client, message) {
    let text = message.content;
    if (text.substring(0, 1) == '!') {
        let args = text.substring(1).split(' ');
        let cmd = args[0];

        if (command_list.hasOwnProperty(cmd)) {
            let functor = command_list[cmd].command; 
            return functor(client, message);
        }
    }
    return null;
};
