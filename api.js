const { Api } = require("grammy");
const token = process.env.TOKEN;
const api = new Api(token);
module.exports = { api };
