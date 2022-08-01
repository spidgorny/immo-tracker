import { Button, Spinner } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import cn from "classnames";
import React from "react";

export function SaveButtonGreen({ className, isWorking, isSuccess, isError, ...buttonProps }) {
	const isDefault = !isWorking && !isSuccess && !isError;
	return (
		<>
			<Button
				className={cn(className, {
					isWorking,
					isSuccess,
					isError,
				})}
				type="submit"
				id="saveButtonGreen"
				{...buttonProps}
			>
				{isWorking && (
					<>
						<Spinner animation="border" size="sm" className="me-2" /> Saving
					</>
				)}
				{isSuccess ? (
					<>
						<FaCheck className="d-inline-block" /> Saved
					</>
				) : null}
				{isError && "X Error"}
				{isDefault && "Save"}
			</Button>
		</>
	);
}
