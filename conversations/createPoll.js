const { cancelKeyboard } = require("../keyboards/cancelKeyboard");
const { toAdminMenuKeyboard } = require("../keyboards/toAdminMenuKeyboard");
const { answersToKeyboard } = require("../services");


const createPoll = async (conversation, ctx) => {
	ctx.reply("Введите сообщение опроса", {reply_markup: cancelKeyboard});
	const pollCtx = await conversation.wait();
	const poll = pollCtx.message?.text;
	if (!poll) {
		pollCtx.msg.delete()
    return ctx.reply("Вы отменили создание опроса", {reply_markup: toAdminMenuKeyboard});
  }
	ctx.reply(`Введите через запятую варианты ответов`);
	const answersCtx = await conversation.wait();
	const keyboard = answersToKeyboard(answersCtx.message.text)
	await ctx.reply("Опрос создан", {reply_markup: toAdminMenuKeyboard});
	await ctx.reply(poll, {reply_markup: keyboard});
};

module.exports = { createPoll };
