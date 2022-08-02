import {
  getDeleteQuery,
  getInsertQuery,
  getInsertUpdateQuery,
  getSelectQuery,
  getUpdateQuery,
} from "./query-builder";
import { MysqlConnector } from "./mysql-connector";

export class MysqlTable {
  TABLE: string;
  db: MysqlConnector;

  constructor(db: MysqlConnector, table: string) {
    this.TABLE = table;
    this.db = db;
  }

  async select(where: any, options = {}) {
    const query = getSelectQuery(this.TABLE, where, options);
    // console.log(query.query);
    return await this.db.query(query.query, query.values);
  }

  async selectQ(where: any, options = {}) {
    const query = getSelectQuery(this.TABLE, where, options);
    const rows = await this.db.query(query.query, query.values);
    return { query: query.query, values: query.values, rows };
  }

  async selectOne(where: any, options = {}) {
    const query = getSelectQuery(this.TABLE, where, { ...options, size: 1 });
    // console.log(query.query);
    return (await this.db.query(query.query, query.values))[0];
  }

  async insert(data: any) {
    const query = getInsertQuery(this.TABLE, data);
    // console.log(query.query, query.values);
    const res = await this.db.query(query.query, query.values);
    return { ...res, query: query.query, values: query.values };
  }

  async update(data: any, where: any) {
    const query = getUpdateQuery(this.TABLE, data, where);
    // console.log(query.query, query.values);
    const res = await this.db.query(query.query, query.values);
    return { ...res, query: query.query, values: query.values };
  }

  async insertUpdate(data: any, updatePlus = {}, insertPlus = {}) {
    const query = getInsertUpdateQuery(
      this.TABLE,
      data,
      updatePlus,
      insertPlus
    );
    // console.log(query.query, query.values);
    const res = await this.db.query(query.query, query.values);
    return { ...res, query: query.query, values: query.values };
  }

  async deleteOne(where: any) {
    if (!Object.keys(where).length) {
      throw new Error("will not delete *");
    }
    const query = getDeleteQuery(this.TABLE, where);
    console.log(query.query, query.values);
    return await this.db.query(query.query, query.values);
  }
}
