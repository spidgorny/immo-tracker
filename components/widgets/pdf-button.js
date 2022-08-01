import { HStack } from "./hstack.js";
import { FaFilePdf } from "react-icons/fa";
import { Button, Spinner } from "react-bootstrap";

export function PdfButton({ onClick, disabled, size, isWorking }) {
	return (
		<Button
			type="submit"
			disabled={disabled}
			onClick={onClick}
			size={size}
			style={{
				backgroundColor: "#ad0c00",
				color: "white",
				borderColor: "darkred",
			}}
		>
			<HStack className="gap-1">
				<FaFilePdf className="mx-2" />
				<span>Download</span>
				{isWorking && <Spinner animation="border" size="sm" className="ms-0" />}
				{!isWorking && <div className="px-2" />}
			</HStack>
		</Button>
	);
}


export function PdfButtonInventoryValuationPage({ onClick, disabled, size, isWorking }) {
	return (
		<Button
			type="submit"
			disabled={disabled}
			onClick={onClick}
			size={size}
			style={{
				backgroundColor: "#ad0c00",
				color: "white",
				borderColor: "darkred",
				lineHeight: '20px',
				width: '40%'
			}}
		>
			<HStack className="gap-1">
				<FaFilePdf className="mx-2" />
				<span>Download</span>
				{isWorking && <Spinner animation="border" size="sm" className="ms-0" />}
				{!isWorking && <div className="px-2" />}
			</HStack>
		</Button>
	);
}
