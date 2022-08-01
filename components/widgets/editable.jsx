import { EditableInput } from "../form/editable-input.js";

export const saveChangeV2 = async (apiUrl, row, name, value, setVal) => {
	if (value === row[name]) {
		return;
	}
	await fetch(`${apiUrl}?id=${row.id}`, {
		method: "PATCH",
		body: JSON.stringify({ [name]: value }),
		headers: { "Content-Type": "application/json" },
	});
	setVal(value);
}

export function makeEditable(row, name, apiUrl) {
	return <EditableInput
		name={name}
		defaultValue={String(row?.[name] ?? "")}
		blur={({ target }, setVal) => saveChangeV2(apiUrl, row, target.name, target.value, setVal)}
	/>
}
