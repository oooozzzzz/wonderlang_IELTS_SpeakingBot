const { InlineKeyboard } = require("grammy");

const toAdminMenuKeyboard = new InlineKeyboard().text(
	"Вернуться в панель администратора",
	"toAdminMenu"
);

module.exports = { toAdminMenuKeyboard };
