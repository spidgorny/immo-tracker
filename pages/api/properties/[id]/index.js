// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getDB } from "../../../../lib/mysql/mysql.ts";
import invariant from "tiny-invariant";

export default async function handler(req, res) {
  const { id } = req.query;
  invariant(id, "id");
  const db = await getDB("immo_tracker");
  const tProps = db.getTable("props");
  const tImages = db.getTable("prop_images");
  const propRow = await tProps.selectOne({ id });
  propRow.images = await tImages.select(
    { id_prop: propRow.id },
    {
      sort: "nr",
    }
  );
  res.status(200).json(propRow);
}
