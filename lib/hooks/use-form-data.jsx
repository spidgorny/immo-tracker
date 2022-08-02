import { useState } from "react";

export function useFormData(initialState) {
	const [formData, setFormData] = useState(initialState);

	const onChange = (e) => {
		let newFormData = { ...formData, [e.target.name]: e.target.value };
		setFormData(newFormData);
		return newFormData;
	};

	const onCheck = (e) => {
		let newFormData = { ...formData, [e.target.name]: e.target.checked };
		setFormData(newFormData);
		return newFormData;
	};

	const getFormData = () => {
		return formData;
	};

	const setFormKey = (key, val) => {
		setFormData({
			...formData,
			[key]: val,
		});
	};

	return { formData, onChange, setFormData, getFormData, setFormKey, onCheck };
}
