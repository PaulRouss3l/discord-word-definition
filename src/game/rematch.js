const Model = require('./model.js');

const ask_for_rematch = function(client, message) {
	const game = Model.get_game(message.channel.id);
	if ('Nn'.includes(message.content[0])) {
		Model.quit_game(message.channel.id);
		message.channel.send('Bye !');
		return true;
	}
	if ('Oo'.includes(message.content[0])) {
		Model.restart_game(message.channel.id);
		const text = 'Nouvelle manche !\nNous jouons avec ' +
            game['player_nb'] +
            ' joueurs !\nLe mot a définir est `' + game['word'] +
            '`.';
		message.channel.send(text);
		return true;
	}
	message.channel.send('Rejouer ? (O/N)');
};

module.exports = {
	ask_for_rematch: ask_for_rematch,
};