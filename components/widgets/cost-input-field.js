import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

export function CostInputField(props) {
	// const debouncedPropsOnChange = useMemo(() => debounce(props.onChange, 300), []);
	const debouncedPropsOnChange = props.onChange;

	const setValue = (value) => {
		return debouncedPropsOnChange(value);
	};

	const onChange = (value) => {
		setValue(value);
		return debouncedPropsOnChange(value);
	};

	return (
		<div
			className="input-group flex-nowrap mx-auto"
			style={{
				transform: `scale(${props.zoom ?? 1})`,
				transformOrigin: props.transformOrigin ?? "50% 50%",
				textAlign: "center"
			}}
		>
			<CostInput
				isError={props.isError}
				value={props.value}
				disabled={props.disabled}
				onChange={onChange}
				style={props.style}
			/>
		</div>
	);
}

CostInputField.propTypes = {
	value: PropTypes.number,
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
	isError: PropTypes.bool,
	zoom: PropTypes.number,
	max: PropTypes.number
};

export function CostInput(props) {
	const [value, setValue] = useState(props.value ?? "");
	const [cursorPos, setCursor] = useState();
	const ref = useRef(null);

	// const debouncedPropsOnChange = useMemo(() => debounce(props.onChange, 300), []);
	const debouncedPropsOnChange = props.onChange;

	const onChange = (e) => {
		setCursor(e.target.selectionStart);
		let value = String(e.target.value).replace(/(\d+)\.(\d+)?(\..*)/, '$1.$2');
		setValue(value);
	};

	const onBlur = (e) => {
		debouncedPropsOnChange(value);
	};

	const onKeypress = (e) => {
		if (e.key === "Enter") {
			debouncedPropsOnChange(value);
		}
	};

	useEffect(() => {
		if (value !== props.value) {
			setValue(props.value);
		}
	}, [props.value]);

	useEffect(() => {
		const input = ref.current;
		if (input) {
			input.setSelectionRange(cursorPos, cursorPos);
		}
	}, [ref, cursorPos, value]);

	return (
		<div
			className="input-group text-nowrap flex-nowrap mx-auto"
			style={{
				transform: `scale(${props.zoom ?? 1})`,
				transformOrigin: props.transformOrigin ?? "50% 50%",
				textAlign: "center",
				width: props.width ?? "9em"
			}}
		>
			<input
				type="text"
				ref={ref}
				min={0.01}
				pattern="[0-9.]+/"
				className={`form-control flex-grow-0 mx-auto text-center ${props.isError ? "bg-danger text-white" : ""}`}
				value={Number(value).toFixed(2)} // Number.parseFloat(x).toFixed(2)
				style={{ ...props.style, padding: "0", textAlign: "center", width: "100%" }}
				onChange={onChange}
				onBlur={onBlur}
				onKeyPress={onKeypress}
				disabled={props.disabled}
				// onFocus={(e) => {e.target.selectionStart = cursorPos}}
			/>
		</div>
	);
}

//import React, { useEffect, useRef, useState } from 'react';
//
// const ControlledInput = (props) => {
//    const { value, onChange, ...rest } = props;
//    const [cursor, setCursor] = useState(null);
//    const ref = useRef(null);
//
//    useEffect(() => {
//       const input = ref.current;
//       if (input) input.setSelectionRange(cursor, cursor);
//    }, [ref, cursor, value]);
//
//    const handleChange = (e) => {
//       setCursor(e.target.selectionStart);
//       onChange && onChange(e);
//    };
//
//    return <input ref={ref} value={value} onChange={handleChange} {...rest} />;
// };
//
// export default ControlledInput;
