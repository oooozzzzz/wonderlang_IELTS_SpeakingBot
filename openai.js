const { default: OpenAI } = require("openai");
require("dotenv").config()

const client = new OpenAI({
	apiKey: process.env.OPENAI,
	baseURL: "https://api.proxyapi.ru/openai/v1/",
});

module.exports = { client };
