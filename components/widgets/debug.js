export function Debug({ children, forceShow, forceHide }) {
	if (forceHide) {
		return null;
	}

	if (forceShow) {
		return children;
	}

	if (document.cookie.includes("depidsyv")) {
		return children;
	}

	return null;
}

export function Json({ name, data }) {
	return (
		<div>
			{/*<legend>{name ?? "JSON"}</legend>*/}
			{/*<details>*/}
			<pre>{JSON.stringify(data, null, 2)}</pre>
			{/*</details>*/}
		</div>
	);
}
