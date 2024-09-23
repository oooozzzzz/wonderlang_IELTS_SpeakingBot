let adminPassword = 'admin'
let ownerPassword = 'owner'

const setNewAdminPassword = (newPassword) => {
	adminPassword = newPassword
	console.log('New admin password set:', adminPassword)
}

const setNewOwnerPassword = (newPassword) => {
	ownerPassword = newPassword
	console.log('New owner password set:', ownerPassword)
}

const getAdminPassword = () => adminPassword
const getOwnerPassword = () => ownerPassword


module.exports = {getAdminPassword, setNewAdminPassword, setNewOwnerPassword, getOwnerPassword}