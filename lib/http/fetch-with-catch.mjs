import fetch from "node-fetch";
import { ErrorWithDetails } from "../common/error.mjs";

export async function fetchWithCatch(url, options = {}) {
	try {
		console.log((options.method ?? "GET").toUpperCase(), url);
		const res = await fetch(url, options);

		// console.log(res.headers);
		let contentLength = parseInt(res.headers.get("content-length"), 10);
		// console.log({ contentLength });

		if (!res.ok) {
			const responseText = await res.text();
			console.error({ options });
			console.error({ responseText });
			if (contentLength > 0) {
				const jsonRes = tryJsonParse(responseText);
				let error = new ErrorWithDetails(responseText, jsonRes);
				error.response = res;
				throw error;
			}
			throw new Error(res.statusText);
		}
		if (contentLength === 0 || res.status === 204) {
			// No Content
			return res.status;
		}

		let responseText = await res.text();
		let json = JSON.parse(responseText);
		return json;
	} catch (e) {
		// JSON error
		console.error(e);
		const res = e?.response;
		console.error(res?.status, res?.headers);
		console.error(responseText);
		return responseText; // as string
	}
}

export function build_url(url, params = {}) {
	const obj = new URL(url);
	Object.keys(params).map((key) => {
		obj.searchParams.set(key, params[key]);
	});
	return obj.toString();
}

export function tryJsonParse(json) {
	try {
		return JSON.parse(json);
	} catch (e) {
		return null;
	}
}
