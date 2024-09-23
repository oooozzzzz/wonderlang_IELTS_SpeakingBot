const { bot } = require("./bot");
const startHandler = require("./handlers/startHandler");
const adminHandler = require("./handlers/adminHandler");
const { toMainMenu, toAdminMenu, toOwnerMenu } = require("./routes");
const ownerHandler = require("./handlers/ownerHandler");
const {
	separate,
	getFileLink,
	replyOnTranscription,
	downloadRecord,
	getTranscription,
	getGPTanswer,
	answerVoiceWithGPT,
	getGPTAnswerWithContext,
	createWordFile,
	filterEnglishText,
	sendWorkToAdmins,
	deleteFile,
} = require("./services");
const { votePollHandler } = require("./handlers/votePollHandler");
const AIHandler = require("./handlers/AIHandler");
const { getAdminPassword, getOwnerPassword } = require("./password");
const photoHandler = require("./handlers/photoHandler");
const { clearGPTContext } = require("./context");
const { toMainMenuKeyboard } = require("./keyboards/toMainMenuKeyboard");
const { InputFile } = require("grammy");

bot.command("start", (ctx) => startHandler(ctx));
bot.command("chat_id", async (ctx) => {
	ctx.reply(ctx.chat.id);
});

bot.callbackQuery("toMenu", async (ctx) => {
	clearGPTContext(ctx.from.id);
	toMainMenu(ctx);
	ctx.answerCallbackQuery();
});
bot.callbackQuery("toAdminMenu", async (ctx) => {
	toAdminMenu(ctx);
	ctx.answerCallbackQuery();
});
bot.callbackQuery("toOwnerMenu", async (ctx) => {
	toOwnerMenu(ctx);
	ctx.answerCallbackQuery();
});
bot.callbackQuery("ok", async (ctx) => {
	const rawText = ctx.msg.text;
	const work = rawText.slice(0, 7)
	const text = rawText.slice(7)
	const answer = filterEnglishText(text)
	await ctx.msg.delete();
	await ctx.reply(`Ваш ответ: \n${answer}`);
	await ctx.api.sendChatAction(ctx.from.id, "upload_document");
	const reply = await getGPTAnswerWithContext(ctx.from.id, answer);
	const path = await createWordFile(reply, ctx.from.username, "part1");
	await ctx.api.sendDocument(ctx.chat.id, new InputFile(path), {
		reply_markup: toMainMenuKeyboard(),
	});
	await sendWorkToAdmins(ctx, path, answer, work)
	deleteFile(path)
	ctx.answerCallbackQuery();
});
bot.callbackQuery("cancel", async (ctx) => {
	try {
		ctx.msg.delete();
	} catch (error) {}
	ctx.conversation.exit();
	ctx.answerCallbackQuery();
});

// bot.on(":voice", async (ctx) => {
// 	ctx.api.sendChatAction(ctx.chat.id, "typing");
// 	const reply = await answerVoiceWithGPT(ctx)
// 	ctx.reply(reply)
// });

bot.on(":text", async (ctx) => {
	const text = ctx.msg.text;
	switch (text) {
		case getAdminPassword():
			await adminHandler(ctx);
			break;
		case getOwnerPassword():
			await ownerHandler(ctx);
			break;
		default:
			await AIHandler(ctx);
			break;
	}
});

// bot.on("message", async (ctx) => {
// 	console.log(ctx.chat);
// });
// bot.on(":photo", async (ctx) => {
// 	let text = ctx.msg.caption
// 	if (!text) {
//     text = 'смотри'
//   }
// 	photoHandler(ctx, text);
// });

bot.callbackQuery(/-/, async (ctx) => {
	// Взаимодействие с категориями
	// try {
	// 	await ctx.msg.delete();
	// } catch (error) {}

	const { itemName, action } = separate(ctx);
	switch (action) {
		case "pref":
			try {
				votePollHandler(ctx, itemName);
			} catch (error) {}
			break;

		default:
			break;
	}
	ctx.answerCallbackQuery();
});

bot.catch(() => {
	bot.start();
});
bot.start();
