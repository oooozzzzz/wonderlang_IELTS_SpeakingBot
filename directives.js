const { setPrompt, getPrompt } = require("./db");

const getDirective = async (label) => {
	const prompt = await getPrompt(label)
	return prompt;
}

const setDirective = async (label, value) => {
  await setPrompt(label, value);
}

module.exports = { getDirective, setDirective };