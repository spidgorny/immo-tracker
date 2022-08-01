import { Card } from "react-bootstrap";
import * as PropTypes from "prop-types";

export function LargeOption(props) {
	return (
		<label>
			<Card className="bg-light">
				<input
					type="radio"
					name="wh"
					value={props.value}
					checked={props.checked}
					style={{ transform: "scale(2)" }}
					onClick={props.onClick}
				/>
				<div className="p-4">{props.children}</div>
			</Card>
		</label>
	);
}

LargeOption.propTypes = {
	onClick: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
	value: PropTypes.string.isRequired,
};
