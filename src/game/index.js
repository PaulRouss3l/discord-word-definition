const Vote = require('./vote.js');
const Write = require('./write.js');
const Rematch = require('./rematch.js');
const Model = require('./model.js');

const check_game_state = async function(client, message) {
	const game = Model.get_game(message.channel.id);
	if (!game) {
		return false;
	}
	if (game.state === 'write') {
		await Write.check_write_submission(client, message);
		if (Object.keys(game.submissions).length >= game.player_nb) {
			return Vote.start_vote(client, message);
		}
	}
	if (game.state === 'vote') {
		await Vote.check_vote_submission(client, message);
		if (Object.keys(game.has_voted).length >= game.player_nb) {
			Vote.display_score(client, message);
		}
	}
	if (game.state === 'game_end') {
		Rematch.ask_for_rematch(client, message);
	}

	return true;
};

module.exports = {
	create_game: Model.create_game,
	check_game_state: check_game_state,
	DEFAULT_PLAYER_NB: Model.DEFAULT_PLAYER_NB,
};
