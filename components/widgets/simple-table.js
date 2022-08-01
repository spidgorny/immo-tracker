// noinspection CheckTagEmptyBody

import React, { Fragment } from "react";
import { Table } from "react-bootstrap";
import cn from "classnames";
import PropTypes from "prop-types";

export function SimpleTable({ className, columns, rows, onOpen, onRowClick, evenRow }) {
	// console.log({ rows, columns });
	return (
		<Table className={className ?? "table table-striped table-bordered table-sm"}>
			<thead>
				<tr>
					{onOpen && <th />}
					{columns.map((x, index) => (
						<th key={index} className="text-center">
							{x.name}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{rows.map((row, index) => (
					<Fragment key={index}>
						<tr
							onClick={(e) => (onRowClick ? onRowClick(e, row) : null)}
							className={cn({
								"cursor-pointer": onRowClick,
							})}
						>
							{onOpen && (
								<td>
									<details>
										<summary></summary>
										{onOpen(row, index)}
									</details>
								</td>
							)}

							{columns.map((x, xIndex) => (
								<td
									key={xIndex}
									className={cn({
										"text-end": x.right,
										"text-center": x.center,
									})}
									style={{
										width: x.width,
									}}
								>
									{x.selector(row)}
								</td>
							))}
						</tr>
						{evenRow && evenRow(row)}
					</Fragment>
				))}
			</tbody>
		</Table>
	);
}

SimpleTable.propTypes = {
	className: PropTypes.string,
	columns: PropTypes.array,
	rows: PropTypes.array,
	onOpen: PropTypes.func,
	onRowClick: PropTypes.func,
	evenRow: PropTypes.func,
};
