const Model = require('../game/model.js');

const command = function(client, message) {
	Model.restart_game(message.channel.id);
	const game = Model.get_game(message.channel.id);
	const text = 'Mot sauté !\nLe mot a définir est `' + game['word'] + '`.';
	message.channel.send(text);
	return true;
};

module.exports = {
	command: '!next-word',
	help: 'Change le mot en cours.',
	action: command,
};
