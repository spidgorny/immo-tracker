import { MysqlTable } from "./mysql-table";
import { DateTime } from "luxon";
import { Company } from "../typings/company";
import { getDB } from "./mysql";

export class TenantTable {
	table: MysqlTable;
	company: Company;

	constructor(table: MysqlTable, company: Company) {
		this.table = table;
		this.company = company;
	}

	async select(where: object, options = {}) {
		return this.table.select({
			...where,
			id_company: this.company.id,
		});
	}

	async selectOne(where: object, options = {}) {
		return this.table.selectOne({
			...where,
			id_company: this.company.id,
		});
	}

	async update(payload: object, where: object) {
		return this.table.update(
			{
				...payload,
				updated_at: DateTime.now().toSQL({
					includeOffset: false,
					includeZone: false,
				}),
			},
			{
				...where,
				id_company: this.company.id,
			}
		);
	}

	async insert(payload: object) {
		return this.table.insert({
			...payload,
			id_company: this.company.id,
			created_at: DateTime.now().toSQL({
				includeOffset: false,
				includeZone: false,
			}),
		});
	}

	async deleteOne(where: object) {
		return this.table.deleteOne({
			...where,
			id_company: this.company.id,
		});
	}

	static async getAppointment(company: Company) {
		return new TenantTable(
			new MysqlTable(await getDB(), "appointment"),
			company
		);
	}
}
