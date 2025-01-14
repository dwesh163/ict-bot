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

const getErrorText = (lang) => {
	return languages[lang].error;
};

module.exports = {
	getModulesText,
	getErrorText,
};
