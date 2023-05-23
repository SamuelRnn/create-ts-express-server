import { Request, Response } from 'express'

export default class PingController {
	async run(req: Request, res: Response) {
		res.sendStatus(200)
	}
}
