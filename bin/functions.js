const { execSync } = require('child_process')

function runSync(command) {
	try {
		execSync(`${command}`)
	} catch (error) {
		console.error(`Error at running "${command}"\n`, error)
		process.exit(1)
	}
}
function getPkgManager() {
	const [name, version] = process.env.npm_config_user_agent.split(' ').shift().split('/')
	return {
		name,
		version,
	}
}
function isValidFolderName(folderName) {
	const invalidCharacters = /[\\/:\*\?"<>\|]/

	if (invalidCharacters.test(folderName)) {
		return false
	}
	// Check if the folder name is empty
	if (folderName.length === 0) {
		return false
	}
	// Check if the folder name is ".."
	if (folderName === '..') {
		return false
	}
	// Check if the folder name ends with a period (".")
	if (folderName.length > 1 && folderName.endsWith('.')) {
		return false
	}
	return true
}

module.exports = { runSync, getPkgManager, isValidFolderName }
