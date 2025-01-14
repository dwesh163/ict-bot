const apiURL = 'api-ict.kooked.app';

const getModules = async (lang = 'de') => {
	const response = await fetch(`https://${apiURL}/modules?lang=${lang}`);
	const data = await response.json();
	return data;
};

const getModuleByJob = async (jobId, lang = 'de') => {
	const response = await fetch(`https://${apiURL}/modules?job_id=${jobId}&lang=${lang}`);
	const data = await response.json();
	return data;
};

const getModuleByYear = async (year, lang = 'de') => {
	const response = await fetch(`https://${apiURL}/modules?year=${year}&lang=${lang}`);
	const data = await response.json();
	return data;
};

const getModule = async (id, lang = 'de') => {
	const response = await fetch(`https://${apiURL}/modules/${id}?lang=${lang}`);
	const data = await response.json();
	return data;
};

const getJobs = async (lang = 'de') => {
	const response = await fetch(`https://${apiURL}/jobs?lang=${lang}`);
	const data = await response.json();

	return data;
};

module.exports = {
	getModules,
	getModuleByJob,
	getModuleByYear,
	getModule,
	getJobs,
};
