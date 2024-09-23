const { Menu } = require("@grammyjs/menu");

const { userGetsNotifications } = require("../db");
const { toggleNotifications } = require("../services");
const { getDirective } = require("../directives");

const adminMenu = new Menu("adminMenu")
	.text("Управление промптами", async (ctx) => {
		ctx.menu.nav("promptsMenu");
		await ctx.msg.editText("Выберите промпт");
	})
	.row()
	.text(
		async (ctx) => {
			return `Получать уведомления ${
				(await userGetsNotifications(ctx.from.id)) ? "🔔" : "🔕"
			}`;
		},
		async (ctx) => {
			await toggleNotifications(ctx.from.id);
			ctx.menu.update();
		}
	)
	.row()
	.text(
		(ctx) => ctx.t("close"),
		async (ctx) => {
			ctx.msg.delete();
		}
	);

const promptsMenu = new Menu("promptsMenu")
	.text("Part1", async (ctx) => {
		const prompt = getDirective("part1");
		await ctx.msg.editText(`Текущий промт \n\n${prompt}`, {
			parse_mode: "HTML",
		});
		ctx.menu.nav("changePart1Menu");
	})
	.row()
	.text("Part2", async (ctx) => {
		const prompt = getDirective("part2");
		await ctx.msg.editText(`Текущий промт \n\n${prompt}`, {
			parse_mode: "HTML",
		});
		ctx.menu.nav("changePart2Menu");
	})
	.row()
	.text("Part3", async (ctx) => {
		const prompt = getDirective("part3");
		await ctx.msg.editText(`Текущий промт \n\n${prompt}`, {
			parse_mode: "HTML",
		});
		ctx.menu.nav("changePart3Menu");
	})
	.row()
	.text("Vocabularly", async (ctx) => {
		const prompt = getDirective("vocab_booster");
		await ctx.msg.editText(`Текущий промт \n\n${prompt}`, {
			parse_mode: "HTML",
		});
		ctx.menu.nav("changeVocabBoosterMenu");
	})
	.row()
	.text("Upgrade", async (ctx) => {
		const prompt = getDirective("IELTS_essay_upgrade");
		await ctx.msg.editText(`Текущий промт \n\n${prompt}`, {
			parse_mode: "HTML",
		});
		ctx.menu.nav("changeEssayUpgradeMenu");
	})
	.row()
	.text(
		(ctx) => ctx.t("back"),
		async (ctx) => {
			await ctx.msg.editText("Добро пожаловать в панель администратора");
			ctx.menu.nav("adminMenu");
		}
	);

const changePart1Menu = new Menu("changePart1Menu")
	.text("Изменить", async (ctx) => {
		await ctx.msg.delete();
		await ctx.conversation.enter("changePart1Prompt");
	})
	.row()
	.text(
		(ctx) => ctx.t("back"),
		async (ctx) => {
			ctx.menu.nav("promptsMenu");
			await ctx.msg.editText("Выберите промпт");
		}
	);
const changePart2Menu = new Menu("changePart2Menu")
	.text("Изменить", async (ctx) => {
		await ctx.msg.delete();
		await ctx.conversation.enter("changePart2Prompt");
	})
	.row()
	.text(
		(ctx) => ctx.t("back"),
		async (ctx) => {
			ctx.menu.nav("promptsMenu");
			await ctx.msg.editText("Выберите промпт");
		}
	);
const changePart3Menu = new Menu("changePart3Menu")
	.text("Изменить", async (ctx) => {
		await ctx.msg.delete();
		await ctx.conversation.enter("changePart3Prompt");
	})
	.row()
	.text(
		(ctx) => ctx.t("back"),
		async (ctx) => {
			ctx.menu.nav("promptsMenu");
			await ctx.msg.editText("Выберите промпт");
		}
	);
const changeVocabBoosterMenu = new Menu("changeVocabBoosterMenu")
	.text("Изменить", async (ctx) => {
		await ctx.msg.delete();
		await ctx.conversation.enter("changeVocabBoosterPrompt");
	})
	.row()
	.text(
		(ctx) => ctx.t("back"),
		async (ctx) => {
			ctx.menu.nav("promptsMenu");
			await ctx.msg.editText("Выберите промпт");
		}
	);
const changeEssayUpgradeMenu = new Menu("changeEssayUpgradeMenu")
	.text("Изменить", async (ctx) => {
		await ctx.msg.delete();
		await ctx.conversation.enter("changeEssayUpgradePrompt");
	})
	.row()
	.text(
		(ctx) => ctx.t("back"),
		async (ctx) => {
			ctx.menu.nav("promptsMenu");
			await ctx.msg.editText("Выберите промпт");
		}
	);

adminMenu.register([
	promptsMenu,
	changePart1Menu,
	changePart2Menu,
	changePart3Menu,
	changeVocabBoosterMenu,
	changeEssayUpgradeMenu,
]);

module.exports = { adminMenu };
