#!/usr/bin/env node

const { dependencies, devDependencies } = require('./deps.json')
const { run, getPkgManager, isValidFolderName } = require('./functions')
const { copySync } = require('fs-extra')
const path = require('path')
const readline = require('readline')

process.on('SIGINT', () => {
	console.log('process end')
	process.exit(1)
})

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

function input(prompt) {
	return new Promise((resolve) => {
		rl.question(prompt, (input) => {
			resolve(input.trim())
		})
	})
}

async function main() {
	let projectName = process.argv[2]?.trim()

	run('cls')

	if (!projectName) {
		let invalidName = true

		while (invalidName) {
			let answer = await input('Project name: ')

			if (isValidFolderName(answer)) {
				projectName = answer
				invalidName = false
			} else {
				console.log('\nInvalid name')
			}
		}
		rl.close()
	}

	const targetPath = projectName === '.' ? '/' : `${projectName}/`
	const pkgManager = getPkgManager()
	const installCmd = `${pkgManager.name} ${pkgManager.name === 'npm' ? 'install' : 'add'}`

	const sourcePath = path.join(__dirname, '/../ts-template')
	const destPath = path.join(process.cwd(), targetPath)
	copySync(sourcePath, destPath)

	console.log(`using "${pkgManager.name}"`)

	run(`cd ${projectName} && ${installCmd} -D ${devDependencies.join(' ')}`)
	run(`cd ${projectName} && ${installCmd} ${dependencies.join(' ')}`)

	const finalStepMsg = {
		npm: 'npm run dev',
		pnpm: 'pnpm dev',
		yarn: 'yarn dev',
	}
	console.log(
		`\nNow run "${projectName === '.' ? '' : `cd ${projectName} && `}${
			finalStepMsg[pkgManager.name]
		}"\n`
	)
	process.exit(1)
}

main()
