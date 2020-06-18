const Model = require('./model.js');
const words = require('./words.js');

/* Randomize array in-place using Durstenfeld shuffle algorithm */
const shuffleArray = function(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
};

const start_vote = function(client, message) {
	const game = Model.get_game(message.channel.id);
	game.state = 'vote';
	let text = 'Toute les définitions ont été écrites ! On passe au vote :';
	message.channel.send(text);

	game.votes = [];
	/* adding the right answer */
	game.submissions[1] = words[game.word];

	for (i in game.submissions) {
		game.votes.push({
			'submission': game.submissions[i],
			'userId': i,
		});
	}

	/* get random order */
	shuffleArray(game.votes);

	text = '';
	let index = 1;
	game.votes.forEach(voteOption => {
		voteOption.position = index;
		text += index + ':\t`' + voteOption.submission + '`\n';
		index += 1;
	});
	message.channel.send(text);
	return true;
};

const check_vote_submission = async function(client, message) {

	const game = Model.get_game(message.channel.id);
	let vote = parseInt(message.content, 10);
	if (!(vote > 0 && vote <= game.player_nb + 1)) {
		return false;
	}
	await message.delete().then(msg => {
		console.log(`vote from ${msg.author.username} : ${msg.content}.`);
	}).catch(console.error);

	// has already voted ?
	if (game.has_voted.includes(message.author.id)) {
		message.channel.send(`${message.author.username}, on ne vote qu'une seule fois !`);
		return false;
	}

	vote = game.votes.find(voteOption => {
		return voteOption.position == vote;
	});

	// voted for himself ?
	if (vote.userId == message.author.id) {
		message.channel.send(`${message.author.username}, on ne vote pas pour soi même !`);
		return false;
	}


	const text = message.author.username + ', ton vote est enregistrée.';
	message.channel.send(text);

	game.has_voted.push(message.author.id);

	if (vote.userId == 1) {
		// good answer
		game.scores[message.author.id].points += 1;
	}
	else {
		// bad answer
		game.scores[vote.userId].points += 1;
	}

	return;
};

const display_score = function(client, message) {
	console.log('display score');
	const game = Model.get_game(message.channel.id);

	const rightAnswer = game.votes.find(voteOption => {
		return voteOption.submission == words[game.word];
	}).position + ': `' + words[game.word] + '`\n';

	let text = 'Manche terminée ! La bonne réponse était :\n' +
    rightAnswer +
    'Voici le score :\n';
	for (userId in game.scores) {
		const score = game.scores[userId];
		text += `\`${score.user}\`: ${score.points} points\n`;
	}
	message.channel.send(text);
	game.state = 'game_end';
	return;
};

module.exports = {
	start_vote: start_vote,
	check_vote_submission: check_vote_submission,
	display_score: display_score,
};