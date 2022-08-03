import { runTest } from "../bootstrap";
import { uploadBufferToS3 } from "../../lib/common/s3";
import fs from "fs";

runTest(async () => {
  const fileName = "../../public/vercel.svg";
  const res = await uploadBufferToS3("vercel.svg", fs.readFileSync(fileName));
  console.log(res);
});
