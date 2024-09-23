const { InlineKeyboard } = require("grammy");

const cancelKeyboard = new InlineKeyboard().text(
	"Отмена",
	"cancel"
);

module.exports = { cancelKeyboard };