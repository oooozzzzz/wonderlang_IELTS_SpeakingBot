const { Menu } = require("@grammyjs/menu");
const { getDirective } = require("../directives");

const adminMenu = new Menu("adminMenu")
	.text("Управление промптами", async (ctx) => {
		ctx.menu.nav("promptsMenu");
		await ctx.msg.editText("Выберите промпт");
	})
	.row()
	.text(
		(ctx) => ctx.t("close"),
		async (ctx) => {
			ctx.msg.delete();
		}
	);

const promptsMenu = new Menu("promptsMenu")
	.text("Part1", async (ctx) => {
		const prompt = await getDirective("part1");
		ctx.menu.nav("changePart1Menu");
		await ctx.msg.editText(`Текущий промт \n\n${prompt}`, {
			parse_mode: "HTML",
		});
	})
	.row()
	.text("Part2", async (ctx) => {
		const prompt = await getDirective("part2");
		ctx.menu.nav("changePart2Menu");
		await ctx.msg.editText(`Текущий промт \n\n${prompt}`, {
			parse_mode: "HTML",
		});
	})
	.row()
	.text("Part3", async (ctx) => {
		const prompt = await getDirective("part3");
		ctx.menu.nav("changePart3Menu");
		await ctx.msg.editText(`Текущий промт \n\n${prompt}`, {
			parse_mode: "HTML",
		});
	})
	.row()
	.text("Vocabularly", async (ctx) => {
		const prompt = await getDirective("vocab_booster");
		ctx.menu.nav("changeVocabBoosterMenu");
		await ctx.msg.editText(`Текущий промт \n\n${prompt}`, {
			parse_mode: "HTML",
		});
	})
	.row()
	.text("Upgrade", async (ctx) => {
		const prompt = await getDirective("IELTS_essay_upgrade");
		ctx.menu.nav("changeEssayUpgradeMenu");
		await ctx.msg.editText(`Текущий промт \n\n${prompt}`, {
			parse_mode: "HTML",
		});
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
		await ctx.conversation.enter("changeEssayUpgraderPrompt");
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
