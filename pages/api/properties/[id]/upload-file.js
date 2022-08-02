// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getDB } from "../../../../lib/mysql/mysql.ts";
import invariant from "tiny-invariant";
import { getNowForSQL } from "../../../../lib/common/date.mjs";
import { uploadBufferToS3, uploadFileToS3 } from "../../../../lib/common/s3";

export default async function handler(req, res) {
  invariant(req.method === "POST", "only POST");
  console.log(req.body);
  const { id_prop, file_name, file_type, file } = req.body;
  invariant(id_prop, "id_prop");

  const fileBytes = Buffer.from(file, "base64");
  const uploadResult = await uploadBufferToS3(file_name, fileBytes, file_type);
  console.log(uploadResult);

  const db = await getDB("immo_tracker");
  const tProps = db.getTable("prop_comments");
  const result = await tProps.insert({
    id_prop,
    file_name,
    file_type,
    file_url: uploadResult.Location,
    created_at: getNowForSQL(),
    updated_at: getNowForSQL(),
  });
  res.status(200).json(result);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "40mb", // Set desired value here
    },
  },
};
