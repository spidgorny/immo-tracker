import { Spinner } from "react-bootstrap";

export function Loading({children}) {
	return (
		<span>
			<Spinner animation="border" size="sm" /> {children}
		</span>
	);
}
