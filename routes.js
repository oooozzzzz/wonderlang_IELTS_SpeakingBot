const { adminMenu } = require("./menus/adminMenu");
const { ownerMenu } = require("./menus/ownerMenu");
const { startMenu } = require("./menus/startMenu");

module.exports.toMainMenu = async (ctx) => {
	try {
		// await ctx.msg.delete();
	} catch (error) {}
	await ctx.reply(ctx.t("start"), { reply_markup: startMenu });
};

module.exports.toAdminMenu = async (ctx) => {
	try {
		await ctx.msg.delete();
	} catch (error) {}
	await ctx.reply(`Доброй пожаловать в панель администратора`, {
		reply_markup: adminMenu,
	});
};

module.exports.toOwnerMenu = async (ctx) => {
	try {
		await ctx.msg.delete();
	} catch (error) {}
	await ctx.reply(`Доброй пожаловать в панель владельца`, {
		reply_markup: ownerMenu,
	});
};
