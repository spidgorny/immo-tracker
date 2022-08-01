// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getDB } from "../../../../lib/mysql/mysql.ts";
import invariant from "tiny-invariant";

export default async function handler(req, res) {
  const { id } = req.query;
  invariant(id, "id");
  const db = await getDB("immo_tracker");
  const tProps = db.getTable("props");
  const results = await tProps.selectOne({ id });
  res.status(200).json(results);
}
