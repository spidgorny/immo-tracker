// @ts-ignore
import mysql from "mysql2/promise";
// @ts-ignore
import fs from "fs";
import { MysqlConnector } from "./mysql-connector";
import { dbCertificate } from "./db-certificate";

let db: Record<string, MysqlConnector> = {};
export async function getDB(dbName = null): Promise<MysqlConnector> {
  if (db[dbName]) {
    return db[dbName];
  }

  console.log("process.env.DOCEAN_HOST", process.env.DOCEAN_HOST);
  if (!process.env.DOCEAN_HOST) {
    throw new Error(".env file missing");
  }

  let config = {
    host: process.env.DOCEAN_HOST,
    user: process.env.DOCEAN_USERNAME,
    password: process.env.DOCEAN_PASSWORD,
    database: dbName ?? process.env.DOCEAN_DATABASE,
    port: Number(process.env.DOCEAN_PORT),
    ssl: {
      // ca: fs.readFileSync("./cacert.pem"),
      // ca: fs.readFileSync("./data/ca-certificate.crt").toString(),
      ca: dbCertificate,
    },
  };
  const conn = mysql.createPool(config);

  db[dbName] = new MysqlConnector(conn);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log({ timezone });
  await db[dbName].query("SET time_zone = ?", [timezone]);

  const dbZone = await db[dbName].query("SELECT @@session.time_zone");
  console.log({ dbZone });

  return db[dbName];
}
