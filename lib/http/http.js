import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export function useFetcher(url, fetcher, options) {
	const [data, setData] = useState();
	const [error, setError] = useState();
	const [isLoading, setLoading] = useState(false);

	const reload = useCallback(async () => {
		if (!url) {
			return;
		}
		setLoading(true);
		try {
			const res = await fetcher(url, options);
			setData(res);
		} catch (e) {
			setError(e);
		} finally {
			setLoading(false);
		}
	}, [fetcher, url, options]);

	useEffect(() => {
		reload();
	}, [reload]);

	return { data, error, isLoading, mutate: reload, mutateMe: reload };
}

export function buildURL(pathname, params = {}) {
	const u = new URL(pathname, document.location.href);
	for (let key in params) {
		u.searchParams.set(key, params[key]);
	}
	return u.toString();
}

export function build_query(params) {
	const p = new URLSearchParams();
	for (let key in params) {
		p.set(key, params[key]);
	}
	return p.toString();
}

export function useWorking() {
	const [state, setState] = useState(false);

	const wrapWorking = useCallback((code) => {
		return async (...vars) => {
			setState(true);
			const res = await code(...vars);
			setState(false);
			return res;
		};
	});

	return { isWorking: state, wrapWorking, setWorking: setState };
}


export function postLambda(lambdaUrl, payload = {}, options = {}) {
	return axios.post(
		"/api/proxy",
		{
			lambdaUrl,
			options,
			...payload,
		},
		options
	);
}
