// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getDB } from "../../../lib/mysql/mysql.ts";
import { handleGet, handlePost } from "../../../lib/common/api";

export default async function handler(req, res) {
  return handleGet(req, res, async () => {
    const db = await getDB("immo_tracker");
    const tProps = db.getTable("props");
    const tImages = db.getTable("prop_images");
    let results = await tProps.select({ deleted: false });
    results = await Promise.all(
      results.map(async (propRow) => {
        propRow.images = await tImages.select(
          { id_prop: propRow.id },
          {
            sort: "nr",
          }
        );
        return propRow;
      })
    );
    return {
      results,
    };
  });
}
