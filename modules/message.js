const fs = require('fs');

const languages = JSON.parse(fs.readFileSync('languages.json', 'utf8'));

const getText = (type, lang) => {
	return languages[lang][type];
};

const getModulesText = (modules) => {
	console.log(modules);
	const text = modules
		.map((module) => {
			return `*${module.name}*`;
		})
		.join('\n');
	return text;
};

const getJobsText = (jobs, lang) => {
	const text = jobs
		.map((job) => {
			return `*${job.id}*\n_${job.name}_`;
		})
		.join('\n\n');

	return `${getText('jobs', 'fr')}\n${text}`;
};

module.exports = {
	getModulesText,
	getJobsText,
};
