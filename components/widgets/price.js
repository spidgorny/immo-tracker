export function Price({ children }) {
	// console.log(children.toLocaleString("en-US", {
	// 	style: "currency",
	// 	currency: "USD",
	// }))

	// console.log("Children in [Price] before String Conversion => ", children);

	const childrenAsString = String(children);
	// console.log("ChildrenAsString:", childrenAsString)
	return (
		// <span data-money={children}>$ {children.toFixed(2) ?? String(0)}</span>
		<span data-money={children}>$ {children.toFixed(2).toLocaleString("en-US") ?? String(0)}</span>
	)

}
