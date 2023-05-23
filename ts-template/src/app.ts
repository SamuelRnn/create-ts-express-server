import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { readdirSync } from 'fs'

const app = express()

app.use(cors({ credentials: true }))
app.use(morgan('dev'))
app.use(express.json())

injectRoutes(app)

export default app

function injectRoutes(appInstance: express.Application) {
	/* 
  The routes are created by reading all of the files in
  the "routes" directory and creating a route segment for each one.
  The routes are then added to the `appInstance` object.
  */
	readdirSync(__dirname + '/routes')
		.map((fileName) => fileName.split('.').shift())
		.forEach(async (routeName) => {
			const routeModule = await import(`./routes/${routeName}.routes`)
			appInstance.use(`/api/${routeName}`, routeModule.default)
		})
}
