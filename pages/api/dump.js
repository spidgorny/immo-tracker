// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getDB } from "../../lib/mysql/mysql.ts";

export default async function handler(req, res) {
  const db = await getDB("immo_tracker");

  const tables = ["props", "prop_comments", "prop_images"];

  let output = [];
  for (let tableName of tables) {
    const t = db.getTable(tableName);
    let rows = await t.select({});
    output.push({
      tableName,
      rows,
    });
  }

  res.status(200).json(output);
}
