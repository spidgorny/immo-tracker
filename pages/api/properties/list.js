// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getDB } from "../../../lib/mysql/mysql.ts";
import { handleGet, handlePost } from "../../../lib/common/api";

export default async function handler(req, res) {
  return handleGet(req, res, async () => {
    let rows;
    let search = req.query.search;
    console.log({ search });
    if (search) {
      rows = await searchPropsByTag(search);
      console.log("rows by tag", rows.length);
      if (!rows.length) {
        rows = await searchPropsByName(search);
        console.log("rows by name", rows.length);
      }
      if (!rows.length) {
        rows = await searchPropsBy({ deleted: false });
      }
    } else {
      rows = await searchPropsBy({ deleted: false });
    }

    rows = await appendImagesToProps(rows);
    rows = await appendTagNamesToProps(rows);
    return {
      results: rows,
    };
  });
}

export async function searchPropsByTag(tag) {
  let where = { deleted: false };
  where = {
    ...where,
    tag,
  };

  return await searchPropsBy(where);
}

export async function searchPropsByName(name) {
  let where = { deleted: false };
  where = {
    ...where,
    name: { $like: "%" + name + "%" },
  };

  return await searchPropsBy(where);
}

export async function searchPropsBy(where = {}) {
  const db = await getDB("immo_tracker");
  const tProps = db.getTable("props");
  let { query, rows } = await tProps.selectQ(where, {
    fields: ["props.*"],
    join: [
      {
        type: "left outer",
        table: "prop_comments",
        on: { $or: [{ id_prop: "props.id" }, { id_prop: { $is: null } }] },
      },
    ],
    group: ["props.id"],
  });
  console.log(query);
  return rows;
}

export async function appendImagesToProps(rows = []) {
  const db = await getDB("immo_tracker");
  const tImages = db.getTable("prop_images");
  rows = await Promise.all(
    rows.map(async (propRow) => {
      propRow.images = await tImages.select(
        { id_prop: propRow.id },
        {
          sort: "nr",
        }
      );
      return propRow;
    })
  );
  return rows;
}

export async function appendTagNamesToProps(rows = []) {
  const db = await getDB("immo_tracker");
  const tComments = db.getTable("prop_comments");
  rows = await Promise.all(
    rows.map(async (propRow) => {
      const comments = await tComments.select(
        { id_prop: propRow.id },
        {
          sort: { created_at: -1 },
        }
      );
      const tagNames = comments.filter((x) => x.tag).map((x) => x.tag);
      return {
        ...propRow,
        tagNames,
      };
    })
  );
  return rows;
}
