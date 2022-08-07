import { runTest } from "../bootstrap";
import { getDB } from "../../lib/mysql/mysql";
import fs from "fs";

runTest(async () => {
  // const dumpUrl = "https://immo-tracker.vercel.app/api/dump";
  // const { data } = await axios.get(dumpUrl);
  let json = fs.readFileSync("data/dump.json", "utf8");
  let data = JSON.parse(json) as any[];
  const db = await getDB("immo_tracker");

  for (let { tableName, rows } of data) {
    console.log("===", tableName, rows.length);
    const table = db.getTable(tableName);
    await Promise.all(
      rows.map((row) => {
        if (row.created_at) {
          row.created_at = row.created_at.substring(0, 19);
        }
        if (row.updated_at) {
          row.updated_at = row.updated_at.substring(0, 19);
        }

        return table.insertUpdate(row);
      })
    );
  }
});
