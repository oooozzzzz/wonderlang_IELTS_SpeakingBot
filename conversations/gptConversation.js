const { InputFile } = require("grammy");
const { clearGPTContext } = require("../context");
const { getDirective, setDirective } = require("../directives");
const { cancelKeyboard } = require("../keyboards/cancelKeyboard");
const { rerollKeyboard } = require("../keyboards/rerollKeyboard");
const { toAdminMenuKeyboard } = require("../keyboards/toAdminMenuKeyboard");
const { toMainMenuKeyboard } = require("../keyboards/toMainMenuKeyboard");
const {
	getGPTanswer,
	replyWithWordDocument,
	getGPTAnswerWithContext,
	getFileLink,
	answerVoiceWithGPT,
	createWordFile,
	getTranscription,
} = require("../services");
const { confirmKeyboard } = require("../keyboards/confirmKeyboard");

const part1Conversation = async (conversation, ctx) => {
	const questionText = await getGPTAnswerWithContext(
		ctx.from.id,
		"random topics",
		await getDirective("part1")
	);

	const question = await ctx.reply(questionText, {
		reply_markup: rerollKeyboard,
	});
	let toStop = false;
	do {
		const response = await conversation.wait();
		const data = response.update?.callback_query?.data;
		let voice = response.update?.message?.voice;

		if (data === "reroll") {
			conversation.external(async () => {
				clearGPTContext(ctx.from.id);
				console.log(data);

				await ctx.api.editMessageText(
					question.chat.id,
					question.message_id,
					"Загрузка..."
				);
				await ctx.api.editMessageText(
					question.chat.id,
					question.message_id,
					await getGPTAnswerWithContext(
						ctx.from.id,
						"random topics",
						await getDirective("part1")
					),
					{ reply_markup: rerollKeyboard }
				);
				console.log("Text is changed");
			});
			continue;
		} else if (data === "cancel") {
			toStop = true;
			await response.msg.delete();
			await ctx.reply("Операция отменена", {
				reply_markup: toMainMenuKeyboard(),
			});
			break;
		} else if (voice) {
			console.log("voice");
			await ctx.api.sendChatAction(ctx.from.id, "typing");
			const transcription = await conversation.external(async () => {
				return await getTranscription(response);
			});
			await ctx.reply(
				`Part_1\n${transcription}\n\nЕсли в расшифровке есть ошибки, отправьте сообщение с исправленным текстом`,
				{ reply_markup: confirmKeyboard }
			);
			break;
		} else {
			clearGPTContext(ctx.from.id)
			await ctx.reply("Операция прервана", {
				reply_markup: toMainMenuKeyboard(),
			});
			break;
		}
	} while (!toStop);
};

const part2Conversation = async (conversation, ctx) => {
	const questionText = await getGPTAnswerWithContext(
		ctx.from.id,
		"random topics",
		await getDirective("part2")
	);

	const question = await ctx.reply(questionText, {
		reply_markup: rerollKeyboard,
	});
	let toStop = false;
	do {
		const response = await conversation.wait();
		const data = response.update?.callback_query?.data;
		let voice = response.update?.message?.voice;

		if (data === "reroll") {
			conversation.external(async () => {
				clearGPTContext(ctx.from.id);
				console.log(data);

				await ctx.api.editMessageText(
					question.chat.id,
					question.message_id,
					"Загрузка..."
				);
				await ctx.api.editMessageText(
					question.chat.id,
					question.message_id,
					await getGPTAnswerWithContext(
						ctx.from.id,
						"random topics",
						await getDirective("part2")
					),
					{ reply_markup: rerollKeyboard }
				);
				console.log("Text is changed");
			});
			continue;
		} else if (data === "cancel") {
			toStop = true;
			await response.msg.delete();
			await ctx.reply("Операция отменена", {
				reply_markup: toMainMenuKeyboard(),
			});
			break;
		} else if (voice) {
			console.log("voice");
			await ctx.api.sendChatAction(ctx.from.id, "typing");
			const transcription = await conversation.external(async () => {
				return await getTranscription(response);
			});
			await ctx.reply(
				`Part_2\n${transcription}\n\nЕсли в расшифровке есть ошибки, отправьте сообщение с исправленным текстом`,
				{ reply_markup: confirmKeyboard }
			);
			break;
		} else {
			clearGPTContext(ctx.from.id)
			await ctx.reply("Операция прервана", {
				reply_markup: toMainMenuKeyboard(),
			});
			break;
		}
	} while (!toStop);
};

const part3Conversation = async (conversation, ctx) => {
	const questionText = await getGPTAnswerWithContext(
		ctx.from.id,
		"random topics",
		await getDirective("part3")
	);

	const question = await ctx.reply(questionText, {
		reply_markup: rerollKeyboard,
	});
	let toStop = false;
	do {
		const response = await conversation.wait();
		const data = response.update?.callback_query?.data;
		let voice = response.update?.message?.voice;

		if (data === "reroll") {
			conversation.external(async () => {
				clearGPTContext(ctx.from.id);
				console.log(data);

				await ctx.api.editMessageText(
					question.chat.id,
					question.message_id,
					"Загрузка..."
				);
				await ctx.api.editMessageText(
					question.chat.id,
					question.message_id,
					await getGPTAnswerWithContext(
						ctx.from.id,
						"random topics",
						await getDirective("part3")
					),
					{ reply_markup: rerollKeyboard }
				);
				console.log("Text is changed");
			});
			continue;
		} else if (data === "cancel") {
			toStop = true;
			await response.msg.delete();
			await ctx.reply("Операция отменена", {
				reply_markup: toMainMenuKeyboard(),
			});
			break;
		} else if (voice) {
			console.log("voice");
			await ctx.api.sendChatAction(ctx.from.id, "typing");
			const transcription = await conversation.external(async () => {
				return await getTranscription(response);
			});
			await ctx.reply(
				`Part_3\n${transcription}\n\nЕсли в расшифровке есть ошибки, отправьте сообщение с исправленным текстом`,
				{ reply_markup: confirmKeyboard }
			);
			break;
		} else {
			clearGPTContext(ctx.from.id)
			await ctx.reply("Операция прервана", {
				reply_markup: toMainMenuKeyboard(),
			});
			break;
		}
	} while (!toStop);
};

const vocabBooster = async (conversation, ctx) => {
	const question = await ctx.reply(
		"По какой теме вам нужно побольше слов, идиом и словосочетаний? Напишите тему по-английски",
		{
			reply_markup: cancelKeyboard,
		}
	);
	const messageCtx = await conversation.wait();
	const message = messageCtx.message?.text;
	if (!message) {
		try {
			await messageCtx.msg.delete();
		} catch (error) {}
		await ctx.reply("Операция отменена", {
			reply_markup: toMainMenuKeyboard(),
		});
		return;
	} else {
		ctx.api.sendChatAction(ctx.chat.id, "typing");
		const response = await getGPTanswer(message, await getDirective("vocab_booster"));
		// await replyWithWordDocument(response, ctx, message, "vocab_booster");
		await ctx.reply(response, { reply_markup: toMainMenuKeyboard() });
		await ctx.api.sendMessage(
			-4542084231,
			`#${ctx.from.username} #vocabulary @${ctx.from.username}\n\n${response}`
		);
		try {
			ctx.api.deleteMessage(question.chat.id, question.message_id);
		} catch (error) {}
	}
};

const essayUpgrade = async (conversation, ctx) => {
	const question = await ctx.reply(
		"Введите расшифровку вашего ответа, и бот покажет, как сделать его лучше.",
		{
			reply_markup: cancelKeyboard,
		}
	);
	const messageCtx = await conversation.wait();
	const message = messageCtx.message?.text;
	if (!message) {
		try {
			await messageCtx.msg.delete();
		} catch (error) {}
		await ctx.reply("Операция отменена", {
			reply_markup: toMainMenuKeyboard(),
		});
		return;
	} else {
		ctx.api.sendChatAction(ctx.chat.id, "typing");
		const response = await getGPTanswer(
			message,
			await getDirective("IELTS_essay_upgrade")
		);
		// await replyWithWordDocument(response, ctx, message, "IELTS_essay_upgrade");
		await ctx.reply(response, { reply_markup: toMainMenuKeyboard() });
		await ctx.api.sendMessage(
			-4542084231,
			`#${ctx.from.username} #upgrade @${ctx.from.username}\n\n${response}`
		);
		try {
			ctx.api.deleteMessage(question.chat.id, question.message_id);
		} catch (error) {}
	}
};

const part1ThemeConversation = async (conversation, ctx) => {
	await ctx.reply("Введите тему", {
		reply_markup: cancelKeyboard,
	});
	const themeCtx = await conversation.wait();
	const theme = themeCtx.message?.text;
	if (!theme) {
		try {
			await themeCtx.msg.delete();
		} catch (error) {}
		await ctx.reply("Операция отменена", {
			reply_markup: toMainMenuKeyboard(),
		});
		return;
	} else {
		ctx.api.sendChatAction(ctx.chat.id, "typing");
		const questions = await getGPTAnswerWithContext(
			ctx.from.id,
			theme,
			await getDirective("part1")
		);
		const question = await ctx.reply(questions, {
			reply_markup: rerollKeyboard,
		});
		let toStop = false;
		do {
			const response = await conversation.wait();
			const data = response.update?.callback_query?.data;
			let voice = response.update?.message?.voice;

			if (data === "reroll") {
				conversation.external(async () => {
					clearGPTContext(ctx.from.id);
					console.log(data);

					await ctx.api.editMessageText(
						question.chat.id,
						question.message_id,
						"Загрузка..."
					);
					await ctx.api.editMessageText(
						question.chat.id,
						question.message_id,
						await getGPTAnswerWithContext(
							ctx.from.id,
							theme,
							await getDirective("part1")
						),
						{ reply_markup: rerollKeyboard }
					);
					console.log("Text is changed");
				});
				continue;
			} else if (data === "cancel") {
				toStop = true;
				await response.msg.delete();
				await ctx.reply("Операция отменена", {
					reply_markup: toMainMenuKeyboard(),
				});
				break;
			} else if (voice) {
				console.log("voice");
				await ctx.api.sendChatAction(ctx.from.id, "typing");
				const transcription = await conversation.external(async () => {
					return await getTranscription(response);
				});
				await ctx.reply(
					`Part_1\n${transcription}\n\nЕсли в расшифровке есть ошибки, отправьте сообщение с исправленным текстом`,
					{ reply_markup: confirmKeyboard }
				);
				break;
			} else {
				clearGPTContext(ctx.from.id)
				await ctx.reply("Операция прервана", {
					reply_markup: toMainMenuKeyboard(),
				});
				break;
			}
		} while (!toStop);
	}
};

const part2ThemeConversation = async (conversation, ctx) => {
	await ctx.reply("Введите тему", {
		reply_markup: cancelKeyboard,
	});
	const themeCtx = await conversation.wait();
	const theme = themeCtx.message?.text;
	if (!theme) {
		try {
			await themeCtx.msg.delete();
		} catch (error) {}
		await ctx.reply("Операция отменена", {
			reply_markup: toMainMenuKeyboard(),
		});
		return;
	} else {
		ctx.api.sendChatAction(ctx.chat.id, "typing");
		const questions = await getGPTAnswerWithContext(
			ctx.from.id,
			theme,
			await getDirective("part2")
		);
		const question = await ctx.reply(questions, {
			reply_markup: rerollKeyboard,
		});
		let toStop = false;
		do {
			const response = await conversation.wait();
			const data = response.update?.callback_query?.data;
			let voice = response.update?.message?.voice;

			if (data === "reroll") {
				conversation.external(async () => {
					clearGPTContext(ctx.from.id);
					console.log(data);

					await ctx.api.editMessageText(
						question.chat.id,
						question.message_id,
						"Загрузка..."
					);
					await ctx.api.editMessageText(
						question.chat.id,
						question.message_id,
						await getGPTAnswerWithContext(
							ctx.from.id,
							theme,
							await getDirective("part2")
						),
						{ reply_markup: rerollKeyboard }
					);
					console.log("Text is changed");
				});
				continue;
			} else if (data === "cancel") {
				toStop = true;
				await response.msg.delete();
				await ctx.reply("Операция отменена", {
					reply_markup: toMainMenuKeyboard(),
				});
				break;
			} else if (voice) {
				console.log("voice");
				await ctx.api.sendChatAction(ctx.from.id, "typing");
				const transcription = await conversation.external(async () => {
					return await getTranscription(response);
				});
				await ctx.reply(
					`Part_2\n${transcription}\n\nЕсли в расшифровке есть ошибки, отправьте сообщение с исправленным текстом`,
					{ reply_markup: confirmKeyboard }
				);
				break;
			} else {
				clearGPTContext(ctx.from.id)
				await ctx.reply("Операция прервана", {
					reply_markup: toMainMenuKeyboard(),
				});
				break;
			}
		} while (!toStop);
	}
};

const part3ThemeConversation = async (conversation, ctx) => {
	await ctx.reply("Введите тему", {
		reply_markup: cancelKeyboard,
	});
	const themeCtx = await conversation.wait();
	const theme = themeCtx.message?.text;
	if (!theme) {
		try {
			await themeCtx.msg.delete();
		} catch (error) {}
		await ctx.reply("Операция отменена", {
			reply_markup: toMainMenuKeyboard(),
		});
		return;
	} else {
		ctx.api.sendChatAction(ctx.chat.id, "typing");
		const questions = await getGPTAnswerWithContext(
			ctx.from.id,
			theme,
			await getDirective("part3")
		);
		const question = await ctx.reply(questions, {
			reply_markup: rerollKeyboard,
		});
		let toStop = false;
		do {
			const response = await conversation.wait();
			const data = response.update?.callback_query?.data;
			let voice = response.update?.message?.voice;

			if (data === "reroll") {
				conversation.external(async () => {
					clearGPTContext(ctx.from.id);
					console.log(data);

					await ctx.api.editMessageText(
						question.chat.id,
						question.message_id,
						"Загрузка..."
					);
					await ctx.api.editMessageText(
						question.chat.id,
						question.message_id,
						await getGPTAnswerWithContext(
							ctx.from.id,
							theme,
							await getDirective("part3")
						),
						{ reply_markup: rerollKeyboard }
					);
					console.log("Text is changed");
				});
				continue;
			} else if (data === "cancel") {
				toStop = true;
				await response.msg.delete();
				await ctx.reply("Операция отменена", {
					reply_markup: toMainMenuKeyboard(),
				});
				break;
			} else if (voice) {
				console.log("voice");
				await ctx.api.sendChatAction(ctx.from.id, "typing");
				const transcription = await conversation.external(async () => {
					return await getTranscription(response);
				});
				await ctx.reply(
					`Part_3\n${transcription}\n\nЕсли в расшифровке есть ошибки, отправьте сообщение с исправленным текстом`,
					{ reply_markup: confirmKeyboard }
				);
				break;
			} else {
				clearGPTContext(ctx.from.id)
				await ctx.reply("Операция прервана", {
					reply_markup: toMainMenuKeyboard(),
				});
				break;
			}
		} while (!toStop);
	}
};

const changePart1Prompt = async (conversation, ctx) => {
	const question = await ctx.reply("Введите новый промпт", {
		reply_markup: cancelKeyboard,
	});
	const messageCtx = await conversation.wait();
	const message = messageCtx.message?.text;
	if (!message) {
		try {
			await messageCtx.msg.delete();
		} catch (error) {}
		await ctx.reply("Операция отменена", {
			reply_markup: toAdminMenuKeyboard,
		});
		return;
	} else {
		setDirective("part1", message);
		ctx.reply("Промпт изменен", {
			reply_markup: toAdminMenuKeyboard,
		});
		try {
			ctx.api.deleteMessage(question.chat.id, question.message_id);
		} catch (error) {}
	}
};
const changePart2Prompt = async (conversation, ctx) => {
	const question = await ctx.reply("Введите новый промпт", {
		reply_markup: cancelKeyboard,
	});
	const messageCtx = await conversation.wait();
	const message = messageCtx.message?.text;
	if (!message) {
		try {
			await messageCtx.msg.delete();
		} catch (error) {}
		await ctx.reply("Операция отменена", {
			reply_markup: toAdminMenuKeyboard,
		});
		return;
	} else {
		setDirective("part2", message);
		ctx.reply("Промпт изменен", {
			reply_markup: toAdminMenuKeyboard,
		});
		try {
			ctx.api.deleteMessage(question.chat.id, question.message_id);
		} catch (error) {}
	}
};
const changePart3Prompt = async (conversation, ctx) => {
	const question = await ctx.reply("Введите новый промпт", {
		reply_markup: cancelKeyboard,
	});
	const messageCtx = await conversation.wait();
	const message = messageCtx.message?.text;
	if (!message) {
		try {
			await messageCtx.msg.delete();
		} catch (error) {}
		await ctx.reply("Операция отменена", {
			reply_markup: toAdminMenuKeyboard,
		});
		return;
	} else {
		setDirective("part3", message);
		ctx.reply("Промпт изменен", {
			reply_markup: toAdminMenuKeyboard,
		});
		try {
			ctx.api.deleteMessage(question.chat.id, question.message_id);
		} catch (error) {}
	}
};

const changeVocabBoosterPrompt = async (conversation, ctx) => {
	const question = await ctx.reply("Введите новый промпт", {
		reply_markup: cancelKeyboard,
	});
	const messageCtx = await conversation.wait();
	const message = messageCtx.message?.text;
	if (!message) {
		try {
			await messageCtx.msg.delete();
		} catch (error) {}
		await ctx.reply("Операция отменена", {
			reply_markup: toAdminMenuKeyboard,
		});
		return;
	} else {
		setDirective("vocab_booster", message);
		ctx.reply("Промпт изменен", {
			reply_markup: toAdminMenuKeyboard,
		});
		try {
			ctx.api.deleteMessage(question.chat.id, question.message_id);
		} catch (error) {}
	}
};

const changeEssayUpgraderPrompt = async (conversation, ctx) => {
	const question = await ctx.reply("Введите новый промпт", {
		reply_markup: cancelKeyboard,
	});
	const messageCtx = await conversation.wait();
	const message = messageCtx.message?.text;
	if (!message) {
		try {
			await messageCtx.msg.delete();
		} catch (error) {}
		await ctx.reply("Операция отменена", {
			reply_markup: toAdminMenuKeyboard,
		});
		return;
	} else {
		setDirective("IELTS_essay_upgrade", message);
		ctx.reply("Промпт изменен", {
			reply_markup: toAdminMenuKeyboard,
		});
		try {
			ctx.api.deleteMessage(question.chat.id, question.message_id);
		} catch (error) {}
	}
};

module.exports = {
	vocabBooster,
	essayUpgrade,
	changeVocabBoosterPrompt,
	changeEssayUpgraderPrompt,
	part1Conversation,
	part2Conversation,
	part3Conversation,
	part1ThemeConversation,
	part2ThemeConversation,
	part3ThemeConversation,
	changePart1Prompt,
	changePart2Prompt,
	changePart3Prompt,
};
