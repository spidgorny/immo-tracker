import stringHash from "string-hash";
import fs from "fs";
import axios from "axios";
import { DateTime } from "luxon";

export async function getCachedUrl(url, ttl = 1000 * 60) {
	return getCachedAnything(url, async () => {
		const {data} = await axios.get(url);
		return data;
	}, ttl)
}

export async function getCachedAnything(url, code, ttl = 1000 * 60) {
	const hash = stringHash(url);
	let cacheFile = `/tmp/${hash}`;
	if (fs.existsSync(cacheFile)) {
		let mtimeMs = fs.statSync(cacheFile).mtimeMs;
		let minTime = DateTime.now().minus({milliseconds: ttl}).toMillis();
		if (mtimeMs > minTime) {
			console.log('HIT', mtimeMs, '>', minTime);
			return fs.readFileSync(cacheFile, "utf-8");
		}
		console.log('MISS', mtimeMs, '>', minTime);
	}
	console.log('MISS', cacheFile);
	const data = await code();
	fs.writeFileSync(cacheFile, data);
	return data;
}
