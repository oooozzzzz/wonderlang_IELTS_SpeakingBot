const { Menu } = require("@grammyjs/menu");
const { getUserDiscounts } = require("../db");
const { toggleDiscount } = require("../services");

const myDiscountsMenu = new Menu("my-discounts-menu")
	.text("Активировать скидку", async (ctx) => {
		const discounts = await getUserDiscounts(ctx.from.id);
		toggleDiscount(discounts[0].id, ctx);
		ctx.menu.nav("back-to-main-menu");
		await ctx.msg.editText("Скидка успешно активирована");
	})
	.row()
	.text(
		(ctx) => ctx.t("back"),
		async (ctx) => {
			try {
				ctx.menu.nav("startMenu");
				ctx.msg.editText(ctx.t("start"));
			} catch (error) {}
		}
	);

module.exports = { myDiscountsMenu };
