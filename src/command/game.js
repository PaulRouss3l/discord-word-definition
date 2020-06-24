const Model = require('../game/model.js');

const command = function(client, message) {
	// restart game ?
	let game = Model.get_game(message.channel.id);
	if (game) {
		Model.restart_game(message.channel.id);
		const text = 'Nouvelle manche !\nNous jouons avec ' +
            game['player_nb'] +
            ' joueurs !\nLe mot a définir est `' + game['word'] +
            '`.';
		message.channel.send(text);
		return true;
	}

	let player_nb = parseInt(message.content.split(' ').slice(1)[0]);
	if (isNaN(player_nb) || player_nb < 0 || player_nb > 10) {
		player_nb = Model.DEFAULT_PLAYER_NB;
		message.channel.send('Nombre de joueur invalide, utilisez un nombre en 1 et 10. On lance la partie avec ' + player_nb + ' joueurs !');
	}
	game = Model.create_game(message.channel.id, player_nb);
	const text = 'Partie commencée !\nSi tu ne connais pas les règles, tape `!rules`.\nNous jouons avec ' +
            game['player_nb'] +
            ' joueurs !\nLe mot a définir est `' + game['word'] +
            '`.';
	message.channel.send(text);
	return true;
};

module.exports = {
	command: '!word-definition',
	help: 'Commence une partie.',
	action: command,
};
