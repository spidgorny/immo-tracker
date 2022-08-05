// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getDB } from "../../../lib/mysql/mysql.ts";
import { handlePost } from "../../../lib/common/api";

export default async function handler(req, res) {
  return handlePost(req, res, async () => {
    const db = await getDB("immo_tracker");
    const tProps = db.getTable("props");
    const { url } = req.body;
    const exists = await tProps.selectOne({ url });
    if (exists) {
      return {
        ...exists,
        insertId: exists.id,
      };
    }
    const payload = {
      ...req.body,
      price: Number(req.body.price),
      area: Number(req.body.area),
    };
    const result = await tProps.insert(payload);
    res.status(200).json({
      result,
    });
  });
}
