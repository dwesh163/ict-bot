const fs = require('fs');
const filePath = 'langData.json';

const readData = () => {
	if (!fs.existsSync(filePath)) {
		return {};
	}
	const rawData = fs.readFileSync(filePath);
	return JSON.parse(rawData);
};

const writeData = (data) => {
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const getLang = (userId) => {
	const data = readData();
	return data[userId] || 'fr';
};

const setLang = (userId, lang) => {
	const data = readData();
	data[userId] = lang;
	writeData(data);
};

module.exports = {
	getLang,
	setLang,
};
