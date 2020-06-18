const Utils = require('./utils.js');

const command_list = Utils.get_all_commands('./src/command/', './command/');

module.exports.check_command = function check_command(client, message) {
	const text = message.content;
	if (text.substring(0, 1) == '!') {
		const args = text.split(' ');
		const cmd = args[0];

		return command_list.filter((command) => {
			return command.command == cmd;
		}).reduce((acc, command) => {
			return acc || command.action(client, message);
		}, false);
	}
	return null;
};