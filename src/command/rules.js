const command = function(client, message) {
	const text = 'World definition est un jeu dans lequel il faut inventer la définition d\'un mot inconnu.\n' +
	'Pour proposer une definition il suffit de taper `!w` par exemple : `!w La definition que je veux proposer.`.\n' +
	'Une fois que chaque joueur a proposé une définition, tout le monde vote pour la définition qu\'il trouve la plus plausible.\n' +
	'Pour voter il suffit de taper `!v` par exemple `!v 1`\n' +
    'Si vous trouvez la bonne définition, vous marquez un point, sinon le point revient a l\'auteur de la définition.\n' +
    'Si vous connaissez déja le sens du mot il est possible de sauter le mot avec `!next_word`.\n' +
    'Pour commencer une partie ou continuer de jouer utilisez `!word-definition <nombre de joueur>`.';
	message.channel.send(text);
	return true;
};

module.exports = {
	command: '!rules',
	help: 'Affiche les règles.',
	action: command,
};
