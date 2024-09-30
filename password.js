const { setPassrword } = require("./db");

const setNewAdminPassword = async (newPassword) => {
	await setPassrword("admin", newPassword);
	console.log("New admin password set");
};

const setNewOwnerPassword = async (newPassword) => {
	await setPassrword("owner", newPassword);
	console.log("New owner password set");
};

module.exports = { setNewAdminPassword, setNewOwnerPassword };
