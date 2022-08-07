// @ts-ignore
import mysql from "mysql2/promise";
// @ts-ignore
import fs from "fs";
import { MysqlConnector } from "./mysql-connector";
import { dbCertificate } from "./db-certificate";
import { registerService } from "./global-service.mjs";
import invariant from "tiny-invariant";

let db: Record<string, MysqlConnector> = {};

export async function getDB(dbName = null): Promise<MysqlConnector> {
  return registerService("db", () => {
    const whichDB = process.env.WHICH_DB;
    const dbEnv = Object.keys(process.env)
      .filter((x) => x.startsWith(whichDB))
      .reduce(
        (a, x) => ({ ...a, [x.replace(whichDB + "_", "")]: process.env[x] }),
        {}
      );
    dbName = dbName ?? process.env.DOCEAN_DATABASE;
    return getDBdirect(dbName, dbEnv);
  });
}

export async function getDBdirect(
  dbName = null,
  dbEnv
): Promise<MysqlConnector> {
  if (db[dbName]) {
    return db[dbName];
  }
  console.log("Connecting to", dbEnv.HOST);
  invariant(dbEnv.HOST, ".env file missing");

  let config = {
    host: dbEnv.HOST,
    user: dbEnv.USERNAME,
    password: dbEnv.PASSWORD,
    database: dbEnv.DATABASE,
    port: Number(dbEnv.PORT) || 3306,
  };
  if (dbEnv.SSLMODE) {
    config = {
      ...config,
      // @ts-ignore
      ssl: {
        // ca: fs.readFileSync("./cacert.pem"),
        // ca: fs.readFileSync("./data/ca-certificate.crt").toString(),
        ca: dbCertificate,
      },
    };
  }
  const conn = mysql.createPool(config);

  db[dbName] = new MysqlConnector(conn);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log({ timezone });
  await db[dbName].query("SET time_zone = ?", [timezone]);

  const dbZone = await db[dbName].query("SELECT @@session.time_zone");
  console.log({ dbZone });

  return db[dbName];
}
