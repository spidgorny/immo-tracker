import { runTest } from "../bootstrap.js";
import axios from "axios";
import fs from "fs";
import stringHash from "string-hash";
import * as cheerio from "cheerio";

runTest(async () => {
  const url = "https://www.idealista.com/en/inmueble/96279217/";
  const html = await getCachedUrl(url);
  console.log(html.substring(0, 100));
  const $ = cheerio.load(html);
  const images = $("img");
  console.table(images);
});

export async function getCachedUrl(url) {
  const hash = stringHash(url);
  let cacheFile = `/tmp/${hash}`;
  if (fs.existsSync(cacheFile)) {
    return fs.readFileSync(cacheFile, "utf-8");
  }
  const { data } = await axios.get(url);
  fs.writeFileSync(cacheFile, data);
  return data;
}
