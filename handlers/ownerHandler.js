const { makeAdmin } = require("../db");
const { ownerMenu } = require("../menus/ownerMenu");

module.exports = async (ctx) => {
	await ctx.msg.delete();
	await makeAdmin(ctx.from.id);
	await ctx.reply("Добро пожаловать в панель владельца", {
		reply_markup: ownerMenu,
	});
};
