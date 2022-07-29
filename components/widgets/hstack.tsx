import { Stack } from "react-bootstrap";
import cn from "classnames";

export function HStack({
	className,
	children,
}: {
	className?: string;
	children: any;
}) {
	return (
		<Stack
			direction="horizontal"
			gap={3}
			className={cn("", className ?? "justify-content-between")}
		>
			{children}
		</Stack>
	);
}
