import { Card } from "react-bootstrap";
import cn from "classnames";

export function NiceBorderAround({ className, children }) {
	return (
		<Card className={cn(className, "w-auto shadow-sm")}>
			<Card.Body className="p-2 p-md-3">{children}</Card.Body>
		</Card>
	);
}
