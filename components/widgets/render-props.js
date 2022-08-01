import { Col, Row } from "react-bootstrap";

export function RenderProps({ props, data }) {
	return (
		<div>
			{Object.keys(props).map((key) => {
				let value = data[key];
				const maybeDate = new Date(value);
				if (maybeDate instanceof Date) {
					value = value.toString().replace("T", " ").substring(0, 19);
				}
				return (
					<Row className="d-flex" key={key}>
						<Col className="col-6 font-bold text-muted">{props[key]}</Col>
						<Col className="col-6">{value}</Col>
					</Row>
				);
			})}
		</div>
	);
}

export function RenderPropsLikeTable({ props, data }) {
	return (
		<div className="fs-6">
			{Object.entries(props).map(([key, desc]) => {
				let value = desc?.format?.(data) ?? desc.selector(data);
				return (
					<Row className="d-flex" key={key}>
						<Col className="col-6 font-bold text-muted fs-7">{desc.name}</Col>
						<Col className="col-6 fs-7">{value}</Col>
					</Row>
				);
			})}
		</div>
	);
}
