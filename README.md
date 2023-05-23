# ts-express-server

## Usage

```bash
$ npx ts-express-server [project-name|.]

#using pnpm
$ pnpm dlx ts-express-server [project-name|.]

#using yarn
$ pnpm dlx ts-express-server [project-name|.]
```

## features

- Path Aliases (add your own in tsconfig.json/paths)
- MVC pattern (kind of)
- Production ready (almost)

## annotations

- Dev server relies on [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
- To remove path alias configuration remove "paths" option on _tsconfig.json_, and replace the scrips in _package.json_ with these:

```json
{
	//...
	"scripts": {
		//...
		"dev": "tsnd --respawn --rs --cls src/main.ts",
		"build": "tsc"
	}
	//...
}
```
