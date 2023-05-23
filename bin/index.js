#!/usr/bin/env node

const { dependencies, devDependencies } = require('./deps.json')
const { runSync, getPkgManager, isValidFolderName } = require('./functions')
const { copySync } = require('fs-extra')
const path = require('path')
const readline = require('readline')
const spinners = require('cli-spinners')
const { readdirSync } = require('fs')

process.on('SIGINT', () => {
	process.exit(0)
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
	const spinner = spinners.material
	let projectName = process.argv[2]?.trim()

	runSync('cls')

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

	const destDir = readdirSync(destPath)

	if (destDir.length) {
		console.error(`\nDirectory "${destPath}" is already in use.`)
		process.exit(0)
	}

	copySync(sourcePath, destPath)

	console.log(`\nusing "${pkgManager.name}"`)

	let currentFrame = 0
	const interval = setInterval(() => {
		process.stdout.write('\r' + 'Installing dependencies ' + spinner.frames[currentFrame])
		currentFrame = (currentFrame + 1) % spinner.frames.length
	}, spinner.interval)

	runSync(`cd ${projectName} && ${installCmd} -D ${devDependencies.join(' ')} && ${installCmd} ${dependencies.join(' ')}`)

	clearInterval(interval)
	process.stdout.clearLine()

	console.log(`\nDependencies installed	`)

	const finalStepMsg = {
		npm: 'npm run dev',
		pnpm: 'pnpm dev',
		yarn: 'yarn dev',
	}
	console.log(`\nNow run "${projectName === '.' ? '' : `cd ${projectName} && `}${finalStepMsg[pkgManager.name]}"\n`)
}

main()
