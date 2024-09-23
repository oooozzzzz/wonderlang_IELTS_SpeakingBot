const { default: OpenAI } = require("openai");

const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	baseURL: "https://api.proxyapi.ru/openai/v1/",
});

module.exports = { client };
