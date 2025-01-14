const apiURL = 'https://api-ict.kooked.app';

const getModules = async (lang) => {
	const response = await fetch(`https://${apiURL}/modules?lang=${lang}`);
	return response.json();
};

const getModuleByJob = async (jobId, lang) => {
	const response = await fetch(`https://${apiURL}/modules?jobId=${jobId}&lang=${lang}`);
	return response.json();
};

const getModuleByYear = async (year, lang) => {
	const response = await fetch(`https://${apiURL}/modules?year=${year}&lang=${lang}`);
	return response.json();
};

const getModule = async (id, lang) => {
	const response = await fetch(`https://${apiURL}/modules/${id}?lang=${lang}`);
	return response.json();
};

const getJobs = async (lang) => {
	const response = await fetch(`https://${apiURL}/jobs?lang=${lang}`);
	return response.json();
};

module.exports = {
	getModules,
	getModuleByJob,
	getModuleByYear,
	getModule,
	getJobs,
};
