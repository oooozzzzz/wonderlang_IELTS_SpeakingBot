const { InlineKeyboard } = require("grammy");

const confirmKeyboard = new InlineKeyboard()
	.text("Все верно", "ok")

module.exports = { confirmKeyboard };
