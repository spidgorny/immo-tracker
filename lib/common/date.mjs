import { DateTime } from "luxon";
import { capitalizeFirstLetter } from "./string.mjs";

export function getNowForSQL() {
	return DateTime.now()
		.setZone("America/New_York")
		.toSQL({ includeOffset: false, includeZone: false });
}

export function sleep(seconds) {
	return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export function sleepMs(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function humanDate(date) {
	if (typeof date === "string") {
		date = new Date(date);
	}
	return date.toISOString().substring(0, 10);
}

// https://gist.github.com/sachinKumarGautam/6f6ce23fb70eec5d03e16b504b63ae2d
export function debounce(fn, time = 300) {
	let timeoutId;
	return wrapper;

	function wrapper(...args) {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			timeoutId = null;
			fn(...args);
		}, time);
	}
}

export function isSameDay(d1, d2) {
	return d1.toISOString().substring(0, 10) === d2.toISOString().substring(0, 10);
}

export function niceTime(iso) {
	const date = typeof iso === "string" ? DateTime.fromISO(iso) : DateTime.fromJSDate(iso);
	return date.toISO({ suppressMilliseconds: true, includeOffset: false })?.replace("T", " ");
}

export function niceDateInNY(iso) {
	const date = typeof iso === "string" ? DateTime.fromISO(iso) : DateTime.fromJSDate(iso);
	return date.setZone("America/New_York").toISODate();
}

export function niceDateTimeInNY(iso) {
	const date = typeof iso === "string" ? DateTime.fromISO(iso) : DateTime.fromJSDate(iso);
	return date
		.setZone("America/New_York")
		.toISO({ suppressMilliseconds: true, suppressSeconds: true, includeOffset: false })
		?.replace("T", " ")
		.substring(0, 16);
}

export function niceRelativeDateTimeInNY(iso) {
	let date = typeof iso === "string" ? DateTime.fromISO(iso, { zone: "America/New_York" }) : DateTime.fromJSDate(iso, { zone: "America/New_York" });

	const d = resetTime(new Date(date || Date.now()));
	const now = resetTime(new Date());
	const dateTime = DateTime.fromMillis(d.getTime());
	dateTime.setZone("America/New_York");

	// show relative date (e.g. today, yesterday, friday, etc) up to 7 days away
	const max_days_written_off = 7;
	const diff = dateTime.diff(DateTime.fromMillis(now.getTime()), "days");
	if (diff.days >= -max_days_written_off && diff.days <= max_days_written_off) {
		const base = DateTime.fromMillis(1642201200000);
		let relative = base.plus({ days: diff.days }).toRelativeCalendar({ base });
		const time = date.toLocaleString({ hour: "numeric", minute: "2-digit" });

		// if not today or yesterday, show day of week instead of how many days ago
		if (diff.days < -1) {
			relative = base.plus({ days: diff.days }).toLocaleString({ weekday: "long" });
		}

		return `${capitalizeFirstLetter(relative)} at ${time}`;
	}

	// if same year, don't add year
	if (DateTime.now().hasSame(date, "year")) {
		return date.toLocaleString({
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "2-digit",
		});
	} else {
		return date.toLocaleString({
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "2-digit",
		});
	}
}

export function niceDateTime(iso) {
	const date = typeof iso === "string" ? DateTime.fromISO(iso) : DateTime.fromJSDate(iso);
	return date
		.toISO({ suppressMilliseconds: true, suppressSeconds: true, includeOffset: false })
		?.replace("T", " ");
}

export async function awaitUntil(method, deadline) {
	while (new Date().getTime() < deadline.getTime()) {
		const res = await method();
		const okArray = Array.isArray(res) && res.length;
		const okObject = typeof res === "object" && !Array.isArray(res) && Object.keys(res).length;
		const okScalar = typeof res !== "object" && res;
		if (okArray || okObject || okScalar) {
			return res;
		}
		await sleep(1);
	}
}

export const formatDate = (str) => {
	return new Date(str).toLocaleDateString("en-US", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});
};

export function convertTimeToNewYork(isoTime) {
	return DateTime.fromISO(isoTime)
		.setZone("America/New_York")
		.toISO({
			includeOffset: false,
			suppressSeconds: true,
			suppressMilliseconds: true,
		})
		.replace("T", " ");
}

export function convertTimeToNewYorkPmAm(isoTime) {
	return DateTime.fromISO(isoTime)
		.setZone("America/New_York")
		.toLocaleString({ ...DateTime.DATE_SHORT, ...DateTime.TIME_SIMPLE });
}

export function niceMoney(amount) {
	return Number(amount).toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	});
}

export function niceDecimal(amount, digits = 2) {
	return Number(amount).toFixed(digits);
}

export function looksLikeTimestamp(x) {
	return String(x).match(/\d{4}-\d{2}-\d{2}(T| )\d{2}:\d{2}:\d{2}/);
}

export function isValidDate(value) {
	return value instanceof Date && !isNaN(value);
}

// Resets to 00:00:00.0000
export const resetTime = (date) => {
	const d = new Date(date || Date.now());
	d.setHours(0);
	d.setMinutes(0);
	d.setSeconds(0);
	d.setMilliseconds(0);
	return d;
};
