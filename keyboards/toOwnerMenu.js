const { InlineKeyboard } = require("grammy");

const toOwnerMenuKeyboard = new InlineKeyboard().text(
	"Вернуться в панель владельца",
	"toOwnerMenu"
);

module.exports = { toOwnerMenuKeyboard };