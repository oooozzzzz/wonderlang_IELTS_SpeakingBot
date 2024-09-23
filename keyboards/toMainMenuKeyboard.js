const { InlineKeyboard } = require("grammy");

const toMainMenuKeyboard = () => {
	const menu = new InlineKeyboard().text("Вернуться в меню", "toMenu");
	return menu;
};
module.exports = { toMainMenuKeyboard };
