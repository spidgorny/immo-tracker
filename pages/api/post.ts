// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {getDB} from "../../lib/mysql/mysql.ts";
import Cors from 'cors'

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
	req: NextApiRequest,
	res: NextApiResponse,
	fn: Function
) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result: any) => {
			if (result instanceof Error) {
				return reject(result)
			}

			return resolve(result)
		})
	})
}

export default async function handler(req, res) {
	const cors = Cors({
		methods: ['POST', 'GET', 'HEAD'],
	})
	await runMiddleware(req, res, cors)

	const db = await getDB('immo_tracker');
	const tProps = db.getTable('props')
	const postData = req.body;
	const results = await tProps.insertUpdate(postData)
	res.status(200).json(results)
}
