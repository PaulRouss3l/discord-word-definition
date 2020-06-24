const Model = require('../game/model.js');
const Vote = require('../game/vote.js');

const command = async function(client, message) {
	const game = Model.get_game(message.channel.id);
	if (!game) {
		return false;
	}
	if (game.state === 'vote') {
		await Vote.check_vote_submission(client, message);
		if (Object.keys(game.has_voted).length >= game.player_nb) {
			Vote.display_score(client, message);
		}
	}
	return true;
};

module.exports = {
	command: '!v',
	help: 'voter pour une définition.',
	action: command,
};
