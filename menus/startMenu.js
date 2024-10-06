const { Menu } = require("@grammyjs/menu");
const { myDiscountsMenu } = require("./myDiscountsMenu");
const { createWordDocument, isChatMember } = require("../services");
const { clearGPTContext } = require("../context");

const startMenu = new Menu("startMenu", { autoAnswer: true })
	.text("Train", async (ctx) => {
		if (await isChatMember(-1002430837732, ctx.from.id, ctx)) {
			ctx.menu.nav("trainMenu");
			clearGPTContext(ctx.from.id);
		} else {
			await ctx.api.answerCallbackQuery(ctx.update.callback_query.id, {
				text: "У вас нет доступа",
				show_alert: true,
			});
		}
	})
	.row()
	.text("Vocabulary", async (ctx) => {
		if (await isChatMember(-1002430837732, ctx.from.id, ctx)) {
			try {
				ctx.msg.delete();
			} catch (error) {}
			clearGPTContext(ctx.from.id);
			await ctx.conversation.enter("vocabBooster");
		} else {
			await ctx.api.answerCallbackQuery(ctx.update.callback_query.id, {
				text: "У вас нет доступа",
				show_alert: true,
			});
		}
	})
	.row()
	.text("Upgrade", async (ctx) => {
		if (await isChatMember(-1002430837732, ctx.from.id, ctx)) {
			try {
				ctx.msg.delete();
			} catch (error) {}
			clearGPTContext(ctx.from.id);
			await ctx.conversation.enter("essayUpgrade");
		} else {
			await ctx.api.answerCallbackQuery(ctx.update.callback_query.id, {
				text: "У вас нет доступа",
				show_alert: true,
			});
		}
	});

const finishConversationMenu = new Menu("finishConversationMenu").back(
	"Продолжить работу с ботом"
);

const backToMenu = new Menu("finishConversationMenu").text(
	"Назад в меню",
	async (ctx) => {
		ctx.menu.nav("startMenu");
		await ctx.msg.editText(ctx.t("start"));
	}
);

const trainMenu = new Menu("trainMenu")
	.text("Random Themes", async (ctx) => {
		ctx.menu.nav("randomThemes");
	})
	.row()
	.text("Your Theme", async (ctx) => {
		ctx.menu.nav("yourTheme");
	})
	.row()
	.back("Back");

const randomThemes = new Menu("randomThemes")
	.text("Part 1", async (ctx) => {
		await ctx.msg.delete();
		await ctx.api.sendChatAction(ctx.from.id, "typing");
		await ctx.conversation.enter("part1Conversation");
	})
	.row()
	.text("Part 2", async (ctx) => {
		await ctx.msg.delete();
		await ctx.api.sendChatAction(ctx.from.id, "typing");

		await ctx.conversation.enter("part2Conversation");
	})
	.row()
	.text("Part 3", async (ctx) => {
		await ctx.msg.delete();
		await ctx.api.sendChatAction(ctx.from.id, "typing");
		await ctx.conversation.enter("part3Conversation");
	})
	.row()
	.text("Back", async (ctx) => {
		ctx.menu.nav("trainMenu");
	});

const yourTheme = new Menu("yourTheme")
	.text("Part 1", async (ctx) => {
		await ctx.msg.delete();
		await ctx.conversation.enter("part1ThemeConversation");
	})
	.row()
	.text("Part 2", async (ctx) => {
		await ctx.msg.delete();
		await ctx.conversation.enter("part2ThemeConversation");
	})
	.row()
	.text("Part 3", async (ctx) => {
		await ctx.msg.delete();
		await ctx.conversation.enter("part3ThemeConversation");
	})
	.row()
	.text("Back", async (ctx) => {
		ctx.menu.nav("trainMenu");
	});

startMenu.register([
	finishConversationMenu,
	backToMenu,
	trainMenu,
	yourTheme,
	randomThemes,
]);

module.exports = { startMenu, finishConversationMenu };
