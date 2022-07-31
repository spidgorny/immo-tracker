export function intersect(o1, o2) {
	const [k1, k2] = [Object.keys(o1), Object.keys(o2)];

	const [first, next] = k1.length > k2.length ? [k2, o1] : [k1, o2];
	const validKeys = first.filter((k) => k in next);
	return Object.fromEntries(validKeys.map((x) => [x, o1[x]]));
}

export function objDiff(o1, o2, includeOriginalProps) {
	const validKeys = includeOriginalProps ? Object.keys({...o1, ...o2}) : Object.keys(o2);
	let diffKeys = validKeys.filter((x) => o1[x] !== o2[x]);
	const mapping = diffKeys.map(
		(x) => `${x}: [${typeof o1[x]}] '${o1[x]}' => [${typeof o2[x]}] '${o2[x]}'`,
	);
	const entries = diffKeys.map((x) => [x, o2[x]]);
	const diff = Object.fromEntries(entries);
	return {diff, mapping};
}

export const validate = (object, schema) =>
	Object.keys(schema)
		.filter((key) => !schema[key](object[key]))
		.map((key) => new Error(`${key} is invalid.`));

export function without(obj, fields = []) {
	const emptyFields = Object.fromEntries(fields.map((x) => [x, undefined]));
	return {
		...obj,
		...emptyFields,
	};
}

export function isIterable(obj) {
	if (obj == null) {
		return false;
	}
	return typeof obj[Symbol.iterator] === "function";
}

export function sumProperties(a, b) {
	const res = a; // default
	for (let key in a) {
		if (typeof a[key] === "number" && typeof b[key] === "number") {
			res[key] = a[key] + b[key];
		}
	}
	return res;
}

export function isPlainObject(value) {
	if (Object.prototype.toString.call(value) !== "[object Object]") {
		return false;
	}
	const prototype = Object.getPrototypeOf(value);
	return prototype === null || prototype === Object.prototype;
}

export function mapObjectValues(obj, mapCode) {
	return Object.fromEntries(Object.entries(obj).map(([key, val]) => ([key, val.map(mapCode)])));
}

export function simpleProps(obj) {
	return Object.fromEntries(
		Object.entries(obj).filter(([key, val]) => ['string', 'number'].includes(typeof val)),
	);
}

export function only(obj, keepKeys = []) {
	if (!isPlainObject(obj)) {
		return obj;
	}
	return Object.fromEntries(Object.entries(obj).filter(([key, val]) => keepKeys.includes(key)));
}

export function flattenObject(obj) {
	let toReturn = {};

	for (let i in obj) {
		if (!obj.hasOwnProperty(i)) continue;

		if (typeof obj[i] == 'object' && obj[i] !== null) {
			let flatObject = flattenObject(obj[i]);
			for (let x in flatObject) {
				if (!flatObject.hasOwnProperty(x)) continue;

				toReturn[i + '.' + x] = flatObject[x];
			}
		} else {
			toReturn[i] = obj[i];
		}
	}
	return toReturn;
}

export function onlyScalarProps(obj) {
	return Object.fromEntries(
		Object.entries(obj).filter(([key, val]) => typeof val === 'number' || typeof val === 'string'),
	);
}

export function convertNullToUndefined(obj) {
	return Object.fromEntries(Object.entries(obj).filter(([key, val]) => val !== null));
}
