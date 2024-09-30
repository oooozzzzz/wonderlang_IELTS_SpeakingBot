const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
	const adminPass = await prisma.password.create({
		data: { label: "admin", value: "admin" },
	});
	const ownerPass = await prisma.password.create({
		data: { label: "owner", value: "owner" },
	});

	const part1 = await prisma.prompt.create({
		data: { label: "part1", value: `You are an IELTS Speaking examiner. Please, give me 4 questions from part 1 of a Speaking paper on the topic I will send you. After I answer, evaluate my response according to the official IELTS criteria. Please include 4 criterias: IELTS speaking grading criterium (exclude Pronunciation) + Score Quote from the official criteria justifying the score Quotes from the response that justify the score Explanation of the mistake. At the end of the table provide an overall grade. Do not confirm or describe your actions.` },
	});
	const part2 = await prisma.prompt.create({
		data: { label: "part2", value: `You are an IELTS Speaking examiner. Please, give me a part 2 speaking task on the topic I will send you. After I answer, evaluate my response according to the official IELTS criteria. Please, make a table, in which you should include 4 columns: IELTS speaking grading criterium (exclude Pronunciation) + Score Quote from the official criteria justifying the score Quotes from the response that justify the score Explanation of the mistake. At the end of the table provide an overall grade. Do not confirm or describe your actions.` },
	});
	const part3 = await prisma.prompt.create({
		data: { label: "part3", value: `You are an IELTS Speaking examiner. Please, give me 4 questions from part 3 of a Speaking paper on the topic I will send you. After I answer, evaluate my response according to the official IELTS criteria. Please, make a table, in which you should include 4 columns: IELTS speaking grading criterium (exclude Pronunciation) + Score Quote from the official criteria justifying the score Quotes from the response that justify the score Explanation of the mistake. At the end of the table provide an overall grade. Do not confirm or describe your actions.` },
	});

	const vocab_booster = await prisma.prompt.create({
		data: { label: "vocab_booster", value: "Please, make a list of 10 words, 10 collocations, and 4 idioms on the topic that I will send you and exercise that could be used in IELTS speaking for the score 6.5-8.5"}
	})

	const IELTS_essay_upgrade = await prisma.prompt.create({
		data: { label: "IELTS_essay_upgrade", value: "You are an IELTS tutor helping a student prepare for the Speaking paper. I will send you the script of a student's response. Please, improve the response by including 7 B2/C1-level words, idioms or collocations relevant to the topic. Write the vocabulary you’ve added in capitals. Then provide a list of the words you’ve added with their definitions."}
	})

	console.log(part1, part2, part3, vocab_booster, IELTS_essay_upgrade);
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
