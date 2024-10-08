const { clearGPTContext } = require("../context");
const { createUser } = require("../db");
const { startMenu } = require("../menus/startMenu");

module.exports = async (ctx) => {
	clearGPTContext(ctx.from.id);
	await ctx.msg.delete();
	// await createUser(ctx.from.id, ctx.from.first_name);
	await ctx.reply("Добро пожаловать в Wonderlang!");
	await ctx.reply(ctx.t("start"), { reply_markup: startMenu });
};
