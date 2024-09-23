const { makeAdmin } = require("../db");
const { ownerMenu } = require("../menus/ownerMenu");
const { getOwnerPassword } = require("../password");

module.exports = async (ctx) => {
	if (ctx.msg.text == getOwnerPassword()) {
		await ctx.msg.delete()
		await makeAdmin(ctx.from.id)
		await ctx.reply("Добро пожаловать в панель владельца", {
			reply_markup: ownerMenu,
		});
	}
};