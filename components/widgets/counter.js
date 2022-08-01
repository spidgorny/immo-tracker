import PropTypes from "prop-types";
import { useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "../../lib/common/date";

export function Counter(props) {
	const debouncedPropsOnChange = useMemo(() => {
		return debounce(props.onChange, 500);
	}, [props.onChange]);

	const [value, setValue] = useState(props.value ?? "");

	const onChange = (value) => {
		setValue(value); // quickly
		return debouncedPropsOnChange(value);
	};

	const decr = () => {
		if (value > 0) {
			let newValue = Number(value) - 1;
			setValue(newValue);
			debouncedPropsOnChange(newValue);
		}
	};

	const incr = () => {
		if (!props.max || value < props.max) {
			let newValue = Number(value) + 1;
			setValue(newValue);
			debouncedPropsOnChange(newValue);
		}
	};

	return (
		<div
			id={"counter-div-" + props.id}
			className="input-group text-nowrap flex-nowrap counter"
			style={{
				transform: `scale(${props.zoom ?? 1})`,
				transformOrigin: props.transformOrigin ?? "50% 50%",
				textAlign: "center",
				width: "auto",
			}}
		>
			<button
				className="btn btn-outline-secondary btn-sm increment"
				type="button"
				id="button-addon1"
				onClick={decr}
				disabled={props.disabled || value <= (props.min ?? 1)}
			>
				-
			</button>
			<SimpleCounter
				id={props.id}
				isError={props.isError}
				value={value}
				setValue={setValue}
				serverValue={props.value}
				disabled={props.disabled}
				onChange={onChange}
				style={props.style}
			/>
			<button
				className="btn btn-outline-secondary btn-sm increment"
				type="button"
				id="button-addon2"
				onClick={incr}
				disabled={props.disabled || (props.max && value >= props.max)}
			>
				+
			</button>
		</div>
	);
}

Counter.propTypes = {
	value: PropTypes.number,
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
	isError: PropTypes.bool,
	zoom: PropTypes.number,
	max: PropTypes.number,
};

export function SimpleCounter({ value, setValue, onChange, ...props }) {
	const ref = useRef();
	const debouncedPropsOnChange = useMemo(() => debounce(onChange, 500), [onChange]);
	// const debouncedPropsOnChange = props.onChange;
	// const debouncedPropsOnChange = (value) => {
	// 	console.log('set', value)
	// };

	const onChangeWrapper = (e) => {
		let value = Number(e.target.value);
		console.log("setValue", typeof setValue);
		setValue(value);
	};

	const onBlur = (e) => {
		debouncedPropsOnChange(value);
	};

	const onKeyDown = (e) => {
		if (e.key === "Enter") {
			debouncedPropsOnChange(value);
			ref.current && ref.current.blur();
		}

		// not working due to the onBlur above
		if (e.key === "Escape") {
			setValue(props.serverValue);
			ref.current && ref.current.blur();
		}
	};

	return (
		<div
			className="input-group text-nowrap flex-nowrap counter"
			style={{
				transform: `scale(${props.zoom ?? 1})`,
				transformOrigin: props.transformOrigin ?? "50% 50%",
				textAlign: "center",
				width: props.width ?? "6em",
			}}
		>
			<input
				id={"counter-input-" + props.id}
				ref={ref}
				type="text"
				min={1}
				pattern="\d+"
				className={`form-control flex-grow-0 ${props.isError ? "bg-danger text-white" : ""}`}
				value={value}
				style={{ ...props.style, padding: "0", textAlign: "center", width: "100%" }}
				onChange={onChangeWrapper}
				onBlur={onBlur}
				onKeyDown={onKeyDown}
				disabled={props.disabled}
			/>
		</div>
	);
}

export function SimpleCounterWithState({ value, ...otherProps }) {
	const [state, setState] = useState(value);

	useEffect(() => {
		setState(value);
	}, [value]);

	return <SimpleCounter value={state} setValue={setState} {...otherProps} />;
}
