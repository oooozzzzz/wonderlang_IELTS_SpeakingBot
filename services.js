const { InlineKeyboard, InputFile } = require("grammy");
const {
	getAllUsers,
	getUserActiveDiscounts,
	outdateDiscount,
	activateDiscount,
	getAdmins,
	getNotifiedUsers,
	notGetNotifications,
	getNotifications,
	userGetsNotifications,
} = require("./db");
require("dotenv").config();
const { toAdminMenuKeyboard } = require("./keyboards/toAdminMenuKeyboard");
const { toMainMenuKeyboard } = require("./keyboards/toMainMenuKeyboard");
const officegen = require("officegen");
const fs = require("fs");
const { client } = require("./openai");
const https = require("https");
const http = require("http");
const { getGPTContext, pushToGRPContext, setGPTContext } = require("./context");

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
const copy = async (id, ctx) => {
	await delay(500);
	try {
		await ctx.message.copy(id);
		return true;
	} catch (error) {
		return false;
	}
};

const processUsersList = async (usersList, ctx, path, text, work) => {
	const sendDocument = async (id, ctx, path, text) => {
		await delay(500);
		try {
			await ctx.api.sendDocument(id, new InputFile(path), {
				caption: `#${ctx.from.username} #${work} \n@${ctx.from.username}`,
			});
			return true;
		} catch (error) {
			return false;
		}
	};
	for (let user in usersList) {
		await sendDocument(usersList[user].tg_id, ctx, path, text);
	}
};
module.exports.copyMessageToUsers = async (ctx) => {
	const usersList = await getAllUsers();

	const { success, failure, atAll } = await processUsersList(
		usersList,
		copy,
		ctx,
	);
	await ctx.reply(
		`Всего отправлено сообщений пользователям: ${atAll}
Успешно: ${success}, с ошибками: ${failure}.`,
		{ reply_markup: toAdminMenuKeyboard },
	);
};

const sendWorkToAdmins = async (ctx, path, text, work) => {
	const usersList = [{ tg_id: "-4542084231" }];
	await processUsersList(usersList, ctx, path, text, work);
};

module.exports.sendWorkToAdmins = async (ctx, path, text, work) => {
	const usersList = [{ tg_id: "-4542084231" }];
	await processUsersList(usersList, ctx, path, text, work);
};

module.exports.toggleNotifications = async (id) => {
	(await userGetsNotifications(id))
		? await notGetNotifications(id)
		: await getNotifications(id);
};

module.exports.getGPTAnswerWithContext = async (id, text, command = "") => {
	if (getGPTContext(id).length < 1) {
		const prompt = { role: "system", content: command };
		pushToGRPContext(id, prompt);
	}
	if (getGPTContext(id).length > 21) {
		const context = getGPTContext(id);
		const newContext = context.splice(1, 2);
		setGPTContext(id, newContext);
	}

	const message = {
		role: "user",
		content: [{ type: "text", text: text }],
	};
	pushToGRPContext(id, message);
	const context = getGPTContext(id);
	const chatCompletion = await client.chat.completions.create({
		messages: context,
		model: "gpt-4o-mini",
	});
	const response = chatCompletion.choices[0].message;
	pushToGRPContext(id, response);
	return response.content;
};
const getGPTAnswerWithContext = async (id, text, command = "") => {
	if (getGPTContext(id).length < 1) {
		const prompt = { role: "system", content: command };
		pushToGRPContext(id, prompt);
	}
	if (getGPTContext(id).length > 21) {
		const context = getGPTContext(id);
		const newContext = context.splice(1, 2);
		setGPTContext(id, newContext);
	}

	const message = {
		role: "user",
		content: [{ type: "text", text: text }],
	};
	pushToGRPContext(id, message);
	const context = getGPTContext(id);
	const chatCompletion = await client.chat.completions.create({
		messages: context,
		model: "gpt-4o-mini",
	});
	const response = chatCompletion.choices[0].message;
	pushToGRPContext(id, response);
	return response.content;
};

module.exports.getGPTanswer = async (text, command) => {
	const prompt = { role: "system", content: command };
	const message = {
		role: "user",
		content: [{ type: "text", text }],
	};
	const chatCompletion = await client.chat.completions.create({
		messages: [prompt, message],
		model: "gpt-4o-mini",
	});
	const response = chatCompletion.choices[0].message.content;
	return response;
};

const deleteFile = async (path) => {
	fs.unlinkSync(path);
};

module.exports.deleteFile = async (path) => {
	fs.unlinkSync(path);
};
module.exports.replyWithWordDocument = async (text, ctx, msg, work) => {
	let docx = officegen("docx");
	const name = ctx.from.username;
	const path = `docs/${name}_${work}.docx`;
	let pObj = await docx.createP();
	await pObj.addText(text);
	let out = fs.createWriteStream(path);
	docx.generate(out);

	out.on("close", async () => {
		await ctx.api.sendDocument(ctx.chat.id, new InputFile(path), {
			reply_markup: toMainMenuKeyboard(),
		});
		await sendWorkToAdmins(ctx, path, msg, work);
		deleteFile(path);
	});
	return path;
};

module.exports.createWordFile = (text, username, work) => {
	return new Promise(async (resolve, reject) => {
		let docx = officegen("docx");
		const name = username;
		const path = `docs/${name}_${work}.docx`;
		let pObj = await docx.createP();
		await pObj.addText(text);
		let out = fs.createWriteStream(path);
		docx.generate(out);

		out.on("close", async () => {
			resolve(path);
		});
	});
};

const downloadRecord = (url, file) => {
	return new Promise((resolve, reject) => {
		let localFile = fs.createWriteStream(file);
		const client = url.startsWith("https") ? https : http;
		client.get(url, (response) => {
			response.on("end", () => {
				console.log("Download of the record is complete");
				resolve(file);
			});

			response.pipe(localFile);
		});
	});
};

module.exports.isChatMember = async (chatId, userId, ctx) => {
	const chatMember = await ctx.api.getChatMember(chatId, userId);
	return chatMember.status == "member";
};

module.exports.getFileLink = async (ctx) => {
	const file = await ctx.getFile(); // valid for at least 1 hour
	const path = file.file_path;
	return `https://api.telegram.org/file/bot${process.env.TOKEN}/${path}`;
};
const getFileLink = async (ctx) => {
	const file = await ctx.getFile(); // valid for at least 1 hour
	const path = file.file_path;
	return `https://api.telegram.org/file/bot${process.env.TOKEN}/${path}`;
};

const getTranscription = async (filePath) => {
	const transcription = await client.audio.transcriptions.create({
		file: fs.createReadStream(filePath),
		model: "whisper-1",
	});
	const response = transcription.text;
	return response;
};
module.exports.getTranscription = async (ctx) => {
	const url = await getFileLink(ctx);
	const path = `voices/${ctx.from.username}.oga`;
	await downloadRecord(url, path);
	const transcription = await client.audio.transcriptions.create({
		file: fs.createReadStream(path),
		model: "whisper-1",
	});
	console.log("Record is sent to ChatGPT");
	deleteFile(path);
	const response = transcription.text;
	return response;
};

module.exports.downloadRecord = (url, file) => {
	return new Promise((resolve, reject) => {
		let localFile = fs.createWriteStream(file);
		const client = url.startsWith("https") ? https : http;
		client.get(url, (response) => {
			response.on("end", () => {
				console.log("Download complete");
				resolve(file);
			});
			response.pipe(localFile);
		});
	});
};

module.exports.replyOnTranscription = (url, file, ctx, command) => {
	let localFile = fs.createWriteStream(file);
	const client = url.startsWith("https") ? https : http;
	client.get(url, (response) => {
		response.on("end", async function () {
			console.log("Download complete");
			const transcription = await getTranscription(file);
			const answer = await getGPTanswer(
				transcription,
				"You are an IELTS Speaking examiner. Please, give me 4 questions from part 1 of a Speaking paper. After I answer, evaluate my response according to the official IELTS criteria. Please, make a table, in which you should include 4 columns: IELTS speaking grading criterium (exclude Pronunciation) + Score Quote from the official criteria justifying the score Quotes from the response that justify the score Explanation of the mistake. At the end of the table provide an overall grade.",
			);
			await ctx.reply(transcription);
			console.log(transcription);
			await ctx.reply(answer);
			deleteFile(file);
		});

		response.pipe(localFile);
	});
};

module.exports.answerVoiceWithGPT = async (ctx, directive = "") => {
	const url = await getFileLink(ctx);
	const path = `voices/${ctx.from.username}.oga`;
	const file = await downloadRecord(url, path);
	const transcription = await getTranscription(file);
	const reply = await getGPTAnswerWithContext(
		ctx.from.id,
		transcription,
		directive,
	);
	return reply;
};

module.exports.filterEnglishText = (text) => {
	var englishText = "";

	// Проверяем каждый символ текста
	for (var i = 0; i < text.length; i++) {
		var char = text[i];

		// Проверяем, является ли символ латинской буквой
		if (
			(char >= "a" && char <= "z") ||
			(char >= "A" && char <= "Z") ||
			char === " " ||
			char === "\n"
		) {
			englishText += char; // Добавляем символ к английскому тексту
		}
	}

	return englishText;
};
