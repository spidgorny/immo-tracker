import { runTest } from "../bootstrap.js";
import { getDB } from "../../lib/mysql/mysql";
import { importImagesFor } from "../../lib/prop/images";
import { sleep } from "../../lib/common/date.mjs";

runTest(async () => {
  // const url = "https://www.idealista.com/en/inmueble/96279217/";
  // await fetchImagesFor(url);
  console.log("process.env.HTTP_PROXY", process.env.HTTP_PROXY);

  const db = await getDB();
  const tProps = db.getTable("props");
  const tImages = db.getTable("prop_images");
  // const propRow = await tProps.selectOne({ id: 2 });
  // await importImagesFor(propRow);

  const propRows = await tProps.select({
    url: { $like: "%idealista%", deleted: false },
  });
  for (let propRow of propRows) {
    const propImages = await tImages.select({ id_prop: propRow.id });
    if (propImages.length) {
      continue;
    }
    await importImagesFor(propRow);
    await sleep(2);
  }
});
