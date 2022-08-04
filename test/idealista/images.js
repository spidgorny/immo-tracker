import { runTest } from "../bootstrap.ts";
import axios from "axios";
import fs from "fs";
import stringHash from "string-hash";
import * as cheerio from "cheerio";
import { getCachedUrl } from "../../lib/common/cache.mjs";

runTest(async () => {
  const url = "https://www.idealista.com/en/inmueble/96279217/";
  const html = await getCachedUrl(url, 1000 * 60 * 10);
  console.log(html.substring(0, 100));
  const $ = cheerio.load(html);
  const images = $("img");
  console.table(images);
});
