const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	schedule: {
		type: 'boolean',
		default: false,
		alias: 's',
		desc: `Schedule of upcoming livestreams`
	},
	episodes: {
		type: 'boolean',
		default: false,
		alias: 'e',
		desc: `List all the past episodes`
	},
	clear: {
		type: `boolean`,
		default: true,
		alias: `c`,
		desc: `Clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	}
};

const commands = {
	help: { desc: `Print help info` }
};

const helpText = meowHelp({
	name: `lwj`,
	defaults: false,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
