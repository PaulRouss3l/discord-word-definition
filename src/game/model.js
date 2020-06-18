const DEFAULT_PLAYER_NB = 2;
const words = require('./words.js');

const current_games = [];

const get_game = function(channelID) {
	if (current_games.indexOf(channelID)) {
		return current_games[channelID];
	}
	return null;
};


function get_random_word() {
	const keys = Object.keys(words);
	const randIndex = Math.floor(Math.random() * keys.length);
	const randKey = keys[randIndex];
	return randKey;
}

/*
** states : "write","vote","game_end"
*/
const create_game = function(channelID, player_nb = 2) {
	current_games[channelID] = {
		word: get_random_word(),
		state: 'write',
		player_nb: player_nb,
		scores: {},
		used_words: [],
		submissions: {},
		votes: [],
		has_voted: [],
	};
	return get_game(channelID);
};

const quit_game = function(channelID) {
	current_games[channelID] = null;
};

const restart_game = function(channelID) {
	current_games[channelID].word = get_random_word(),
	current_games[channelID].state = 'write',
	current_games[channelID].used_words = [];
	current_games[channelID].submissions = {};
	current_games[channelID].votes = [];
	current_games[channelID].has_voted = [];
	return get_game(channelID);
};


module.exports = {
	get_game: get_game,
	create_game: create_game,
	quit_game: quit_game,
	restart_game: restart_game,
	DEFAULT_PLAYER_NB: DEFAULT_PLAYER_NB,
};