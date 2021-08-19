const ora = require('ora');
const axios = require('axios');
const { dim, yellow } = require('chalk');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');

const spinner = ora({ text: '' });
const apiURL = `https://www.learnwithjason.dev/api/schedule`;

module.exports = async () => {
	spinner.start(dim(`Fetching LearnWithJason schedule…`));
	const [err, res] = await to(axios.get(apiURL));
	handleError(`API CALL FAILED`, err, true, true);

	const schedule = res.data.map(({ title, description, slug, guest }) => {
		return {
			title,
			description,
			guestName: guest[0].name,
			link: `https://www.learnwithjason.dev/${slug.current}`
		};
	});
	spinner.stop();

	schedule.map(({ title, description, link, guestName }, index) => {
		console.log(
			`${dim(`#${++index}`)} ${title} ${dim(`with`)} ${yellow(guestName)}`
		);
		console.log(dim(`❯❯ ${link}`));
		console.log();
		console.log(dim(description));
		console.log();
		console.log();
	});
};
