const { makeAdmin } = require("../db");
const { adminMenu } = require("../menus/adminMenu");
const { getAdminPassword } = require("../password");

module.exports = async (ctx) => {
	if (ctx.msg.text == getAdminPassword()) {
		await ctx.msg.delete();
		await makeAdmin(ctx.from.id)
		await ctx.reply("Добро пожаловать в панель администратора", {
			reply_markup: adminMenu,
		});
	}
};
