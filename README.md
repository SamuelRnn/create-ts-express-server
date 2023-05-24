# create-ts-express-server

## Usage

```bash
npm create ts-express-server@latest

yarn create ts-express-server

pnpm create ts-express-server
```

- Optionally pass project directory `valid-dir | .` as:

```bash
pnpm create ts-express-server <project-directory>
```

## features

- Path Aliases (default "_@/_" for "_src/_" dir, change it in tsconfig.json/paths)
- MVC pattern (kind of)
- Production ready (almost)

## annotations

- Dev server relies on [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
- To remove path alias configuration remove "paths" option on _tsconfig.json_, and replace the _scripts_ in _package.json_ with these:

```json
{
	//...
	"scripts": {
		//...
		"dev": "tsnd --respawn --rs --cls src/main.ts",
		"build": "tsc"
		//...
	}
	//...
}
```
