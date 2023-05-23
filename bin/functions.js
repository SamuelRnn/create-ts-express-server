const { execSync } = require('child_process')

function run(command) {
	try {
		execSync(`${command}`, {
			stdio: 'inherit',
		})
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
	// Define invalid characters that cannot be used in a folder name
	const invalidCharacters = /[\\/:\*\?"<>\|]/

	// Check if the folder name contains any invalid characters
	if (invalidCharacters.test(folderName)) {
		return false
	}

	// Check if the folder name is empty
	if (folderName.length === 0) {
		return false
	}

	// Check if the folder name is "." or ".."
	if (folderName === '.' || folderName === '..') {
		return false
	}

	// Check if the folder name ends with a period (".")
	if (folderName.endsWith('.')) {
		return false
	}

	// The folder name is valid
	return true
}

module.exports = { run, getPkgManager, isValidFolderName }
