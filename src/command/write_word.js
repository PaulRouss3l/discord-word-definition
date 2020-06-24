const Model = require('../game/model.js');
const Write = require('../game/write.js');
const Vote = require('../game/vote.js');

const command = async function(client, message) {
	let game = Model.get_game(message.channel.id);
	if (!game) {
		return false;
	}
	if (game.state === 'write') {
		await Write.check_write_submission(client, message);
		game = Model.get_game(message.channel.id);
		if (Object.keys(game.submissions).length >= game.player_nb) {
			return Vote.start_vote(client, message);
		}
	}
	return true;
};

module.exports = {
	command: '!w',
	help: 'écrire une définition.',
	action: command,
};