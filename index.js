#!/usr/bin/env node

/**
 * lwj
 * Learn with Jason
 *
 * @author Ahmad Awais <https://twitter.com/MrAhmadAwais/>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');

const alert = require('cli-alerts');
const episodes = require('./utils/episodes');
const schedule = require('./utils/schedule');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	flags.schedule &&
		alert({
			type: 'info',
			name: `LearnWithJason.dev`,
			msg: `Schedule`
		});
	flags.schedule && (await schedule());

	flags.episodes &&
		alert({
			type: 'info',
			name: `LearnWithJason.dev`,
			msg: `Episodes`
		});
	flags.episodes && (await episodes());

	debug && log(flags);
})();
