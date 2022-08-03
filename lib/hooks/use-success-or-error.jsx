import { useState } from "react";
import ErrorAlert from "../../shared/widgets/error-alert";

export function useSuccessOrError() {
	const [isSuccess, setSuccess] = useState(false);
	const [error, setError] = useState("");

	const Show = ({ children }) => {
		return (
			<div className="my-3">
				<SuccessAlert show={isSuccess}>{children}</SuccessAlert>
				<ErrorAlert error={error} />
			</div>
		);
	};

	return {
		isSuccess,
		setSuccess: () => setSuccess(true),
		setError,
		Show,
		reset: () => {
			setSuccess(false);
			setError('')
		},
	};
}

export function SuccessAlert({ show, children }) {
	return (
		show && (
			<div className="my-3">
				<span className="bg-lime-200 text-lime-800 px-3 py-3">{children}</span>
			</div>
		)
	);
}
