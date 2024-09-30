const { InputFile } = require("grammy");
const { clearGPTContext } = require("../context");
const { getGPTAnswerWithContext, createWordFile, sendWorkToAdmins, deleteFile } = require("../services");
const { toMainMenuKeyboard } = require("../keyboards/toMainMenuKeyboard");
module.exports = async (ctx) => {
	const text = ctx.msg.text;
	if (text === "!!") {
		clearGPTContext(ctx.from.id);
		return
	}
	ctx.api.sendChatAction(ctx.from.id, "typing");
	const response = await getGPTAnswerWithContext(ctx.from.id, text);
	const path = await createWordFile(response, ctx.from.username, "speaking");
	await ctx.api.sendDocument(ctx.chat.id, new InputFile(path), {
		reply_markup: toMainMenuKeyboard(),
	});
	await sendWorkToAdmins(ctx, path, response, "training");
	deleteFile(path);
};