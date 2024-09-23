const { InlineKeyboard } = require("grammy");

const rerollKeyboard = new InlineKeyboard()
	.text("Обновить вопросы", "reroll")
	.row()
	.text("Отмена", "cancel");

module.exports = { rerollKeyboard };
