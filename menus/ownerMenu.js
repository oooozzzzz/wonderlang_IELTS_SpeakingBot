const { Menu } = require("@grammyjs/menu");

const ownerMenu = new Menu("ownerMenu")
	.text("Сменить пароль администратора", async (ctx) => {
		try {
			await ctx.msg.delete();
		} catch (error) {}
		await ctx.conversation.enter("changeAdminPassword");
	})
	.row()
	.text("Сменить пароль владельца", async (ctx) => {
		try {
			await ctx.msg.delete();
		} catch (error) {}
		await ctx.conversation.enter("changeOwnerPassword");
	})
	.row()
	.text(
		(ctx) => ctx.t("close"),
		async (ctx) => {
			await ctx.msg.delete();
		}
	);

module.exports = { ownerMenu };
