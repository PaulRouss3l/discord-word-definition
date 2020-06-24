const fs = require('fs');
const path = require('path');
const __hasProp = {}.hasOwnProperty;

const _collectExports = function(file, prefix = './') {
	let func, include, _results;

	if (path.extname(file) === '.js' && file !== 'index.js') {
		include = require(prefix + file);
		_results = {};
		for (func in include) {
			if (!__hasProp.call(include, func)) continue;
			_results[func] = (exports[func] = include[func]);
		}
		return _results;
	}
};
module.exports.get_all_commands = function(file, prefix = './') {
	const cmd_list = [];
	fs.readdirSync(file).forEach((f) => {
		cmd_list.push(_collectExports(f, prefix));
	});
	// add !help command
	cmd_list.push({
		command: '!help',
		help: 'Affiche l\'aide.',
		action: function(client, message) {
			let text = '';
			cmd_list.forEach(function(current) {
				text += `\`${current.command}\`: ${current.help}\n`;
			});
			message.channel.send(text);
			return true;
		},
	});
	return cmd_list;
};
