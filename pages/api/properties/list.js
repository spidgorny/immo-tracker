// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {getDB} from "../../../lib/mysql/mysql.ts";

export default async function handler(req, res) {
	const db = await getDB('immo_tracker');
	const tProps = db.getTable('props')
	const results = await tProps.select({})
	res.status(200).json({
		results,
		}
	)
}
