import { runTest } from "../bootstrap.js";
import { getDB } from "../../lib/mysql/mysql";
import { importImagesFor } from "../../lib/prop/images";

runTest(async () => {
  // const url = "https://www.idealista.com/en/inmueble/96279217/";
  // await fetchImagesFor(url);

  const db = await getDB();
  const tProps = db.getTable("props");
  // const propRow = await tProps.selectOne({ id: 2 });
  // await importImagesFor(propRow);

  const propRows = await tProps.select({ url: { $like: "%idealista%" } });
  await Promise.all(propRows.map(importImagesFor));
});
