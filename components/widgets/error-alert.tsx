import { Alert } from "react-bootstrap";

export function ErrorAlert({
	error,
	className,
}: {
	error: Error;
	className?: string;
}) {
	if (!error) {
		return null;
	}
	return (
		<Alert variant={"danger"} className={className}>
			{String(error?.message ?? error)}
		</Alert>
	);
}
