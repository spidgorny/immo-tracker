import { MysqlTable } from "./mysql-table";

export class MysqlConnector {
  connection;

  constructor(conn: any) {
    this.connection = conn;

    this.connection.on("error", function (err: Error) {
      console.error("MYSQL Error event triggered. Connection is dead: ", err);
      process.exit(1);
    });
  }

  async query(sql: string, args: any[] = []) {
    const [rows] = await this.connection.query(sql, args);
    return rows;
  }

  async close() {
    await this.connection.end();
  }

  getTable(tableName: string) {
    return new MysqlTable(this, tableName);
  }
}
