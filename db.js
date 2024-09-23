const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.createUser = async (tg_id, name) => {
	const id = tg_id.toString();
	try {
		await prisma.user.create({
			data: {
				tg_id: id,
				first_name: name,
			},
		});
		return true;
	} catch (error) {
		return false;
	}
};

module.exports.makeAdmin = async (id) => {
	id = id.toString();
	await prisma.user.update({
		where: { tg_id: id },
		data: { isAdmin: true },
	});
};

module.exports.addComment = async ({ id, comment, isPositive }) => {
	id = id.toString();
	try {
		await prisma.user.update({
			where: { tg_id: id },
			data: {
				comments: {
					create: {
						content: comment,
						isPositive,
						tg_id: id,
					},
				},
			},
		});
	} catch (error) {}
};

module.exports.getAllUsers = async () => {
	try {
		const users = await prisma.user.findMany({ select: { tg_id: true } });
		return users;
	} catch (error) {
		return false;
	}
};

module.exports.getAdmins = async () => {
	try {
		const users = await prisma.user.findMany({
			where: { isAdmin: true },
			select: { tg_id: true },
		});
		return users;
	} catch (error) {
		return false;
	}
};

module.exports.getNotifiedUsers = async () => {
	try {
		const users = await prisma.user.findMany({
			where: { getNotifications: true },
			select: { tg_id: true },
		});
		return users;
	} catch (error) {
		return false;
	}
};

module.exports.userGetsNotifications = async (id) => {
	const tg_id = id.toString();
	try {
		const result = await prisma.user.findUnique({
			where: { tg_id },
			select: { getNotifications: true },
		});
		return result.getNotifications;
	} catch (error) {
		return false;
	}
};

module.exports.getNotifications = async (id) => {
	const tg_id = id.toString();
	try {
		await prisma.user.update({
			where: { tg_id },
			data: { getNotifications: true },
		});
		return true;
	} catch (error) {
		return false;
	}
};
module.exports.notGetNotifications = async (id) => {
	const tg_id = id.toString();
	try {
		await prisma.user.update({
			where: { tg_id },
			data: { getNotifications: false },
		});
		return true;
	} catch (error) {
		return false;
	}
};

module.exports.addPreference = async ({ preference, tg_id }) => {
	tg_id = tg_id.toString();
	try {
		await prisma.user.update({
			where: { tg_id: tg_id },
			data: { preferences: { create: { value: preference } } },
		});
		return true;
	} catch (error) {
		return false;
	}
};

module.exports.addDiscount = async ({ tg_id, value, label }) => {
	tg_id = tg_id.toString();
	try {
		await prisma.user.update({
			where: { tg_id: tg_id },
			data: { discounts: { create: { tg_id, value, label } } },
		});
		return true;
	} catch (error) {
		return false;
	}
};

module.exports.getUserDiscounts = async (tg_id) => {
	tg_id = tg_id.toString();
	try {
		const discounts = await prisma.discount.findMany({
			where: { tg_id, isOutdated: false },
			select: { value: true, id: true },
		});
		return discounts;
	} catch (error) {
		return false;
	}
};

module.exports.getUserActiveDiscounts = async (tg_id) => {
	tg_id = tg_id.toString();
	try {
		const discounts = await prisma.discount.findMany({
			where: { tg_id, isActive: true },
			select: { value: true, id: true },
		});
		return discounts;
	} catch (error) {
		return false;
	}
};

module.exports.activateDiscount = async (id) => {
	try {
		await prisma.discount.update({ where: { id }, data: { isActive: true } });
		console.log("Activated");
		return true;
	} catch (error) {
		return false;
	}
};

module.exports.outdateDiscount = async (id) => {
	try {
		await prisma.discount.update({
			where: { id },
			data: { isOutdated: true, isActive: false },
		});
		console.log("Outdated");
		return true;
	} catch (error) {
		return false;
	}
};
