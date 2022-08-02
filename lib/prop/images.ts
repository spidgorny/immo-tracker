import { getDB } from "../mysql/mysql.js";
import { getNowForSQL } from "../common/date.mjs";
import { getCachedAnything } from "../common/cache.mjs";
import * as cheerio from "cheerio";
import scrapingbee from "scrapingbee";

export async function importImagesFor(propRow) {
  console.log("==", propRow.id, propRow.url);
  const images = await fetchImagesFor(propRow.url);

  const db = await getDB();
  const tImages = db.getTable("prop_images");
  const dbRes = await Promise.all(
    images.map((img: any, nr) =>
      tImages.insertUpdate(
        {
          id_prop: propRow.id,
          nr,
          src: img.src,
        },
        {
          updated_at: getNowForSQL(),
        },
        {
          created_at: getNowForSQL(),
        }
      )
    )
  );
  console.table(dbRes, ["insertId", "affectedRows"]);
}

export async function fetchImagesFor(url) {
  const text = await getCachedAnything(
    url,
    async () => {
      const response = await beeGet(url);
      const decoder = new TextDecoder();
      return decoder.decode(response.data);
    },
    1000 * 60 * 100
  );
  console.log(text.substring(0, 100));
  const $ = cheerio.load(text);
  let images = $("img").toArray().filter(Boolean);
  console.log(images.length);
  // @ts-ignore
  images = images.map((x, i) => {
    if (!x.attribs.src) {
      // console.log(x.attribs);
    }
    return {
      ...x,
      src: x.attribs.src ?? x.attribs["data-ondemand-img"],
      id: x.attribs.id,
      className: x.attribs["class"],
    };
  });
  // console.table(images, ["name", "src", "className"]);
  images = images.filter((x: Element | any) => {
    let className = String(x.className);
    return (
      className.includes("image-focus") ||
      className.includes("detail-image-gallery")
    );
  });
  console.table(images, ["name", "src"]);
  return images;
}

async function beeGet(url) {
  const client = new scrapingbee.ScrapingBeeClient(process.env.SCRAPBEE);
  return client.get({
    url: url,
    params: {},
  });
}
