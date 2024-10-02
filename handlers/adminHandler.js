const { makeAdmin } = require("../db");
const { adminMenu } = require("../menus/adminMenu");

module.exports = async (ctx) => {
	await ctx.msg.delete();
	// await makeAdmin(ctx.from.id);
	await ctx.reply("Добро пожаловать в панель администратора", {
		reply_markup: adminMenu,
	});
};
