import PingController from '@/controllers/ping.controller'
import { Router } from 'express'

const pingRouter = Router()
const pingController = new PingController()

pingRouter.get('/', pingController.run.bind(pingController))

export default pingRouter
