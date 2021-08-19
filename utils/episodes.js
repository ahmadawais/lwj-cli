const ora = require('ora');
const axios = require('axios');
const { dim, italic, bold, yellow } = require('chalk');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');

const spinner = ora({ text: '' });
const apiURL = `https://www.learnwithjason.dev/api/episodes`;

module.exports = async () => {
	spinner.start(dim(`Fetching LearnWithJason episodes…`));
	const [err, res] = await to(axios.get(apiURL));
	handleError(`API CALL FAILED`, err, true, true);

	const episodes = res.data.map(({ title, description, slug, guest }) => {
		return {
			title,
			description,
			guestName: guest[0].name,
			link: `https://www.learnwithjason.dev/${slug.current}`
		};
	});
	spinner.stop();

	episodes.map(({ title, description, link, guestName }, index) => {
		console.log(
			`${dim(`#${++index}`)} ${bold(title)} ${dim(`with`)} ${yellow(
				guestName
			)}`
		);
		console.log(dim(link));
		console.log();
		console.log(dim(italic(description)));
		console.log();
		console.log();
	});
};
