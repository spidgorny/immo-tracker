// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getDB } from "../../../../lib/mysql/mysql.ts";
import invariant from "tiny-invariant";
import { getNowForSQL } from "../../../../lib/common/date.mjs";
import { handlePost } from "../../../../lib/common/api";

export default async function handler(req, res) {
  return handlePost(req, res, async () => {
    const { id_prop, ...formData } = req.body;
    invariant(id_prop, "id_prop");
    const db = await getDB("immo_tracker");
    const tProps = db.getTable("prop_comments");
    const result = await tProps.insert({
      id_prop,
      ...formData,
      created_at: getNowForSQL(),
      updated_at: getNowForSQL(),
    });
    return result;
  });
}
