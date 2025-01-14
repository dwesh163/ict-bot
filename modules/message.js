const fs = require('fs');

const languages = JSON.parse(fs.readFileSync('languages.json', 'utf8'));

const getText = (type, lang) => {
	return languages[lang][type];
};

const getModulesText = (modules, lang) => {
	const groupedByYear = modules.reduce((acc, module) => {
		if (!acc[module.year]) {
			acc[module.year] = {};
		}
		if (!acc[module.year][module.type]) {
			acc[module.year][module.type] = [];
		}
		acc[module.year][module.type].push(module);
		return acc;
	}, {});

	const result = Object.entries(groupedByYear).map(([year, types]) => {
		const yearHeader = `🎓 *${getText('year', lang)} ${year}*`;
		let isFirstType = true;
		const typeTexts = Object.entries(types)
			.map(([type, modules]) => {
				const moduleTexts = modules.map((module) => `  • \`${module.number}\` — _${module.name}_`).join('\n');
				if (isFirstType) {
					isFirstType = false;
					return `${yearHeader} - *${type}*\n${moduleTexts}`;
				} else {
					return `*${type}*\n${moduleTexts}`;
				}
			})
			.join('\n\n');

		return typeTexts;
	});

	const jobHeader = `${getText('modules', lang)}\n`;

	return [jobHeader, ...result];
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
	getText,
};
