import os from "os";

export function runtimeSince(start) {
	return (new Date().getTime() - start.getTime()) / 1000;
}

export function generateRandomLetter() {
	const alphabet = "abcdefghijklmnopqrstuvwxyz";
	return alphabet[Math.floor(Math.random() * alphabet.length)];
}

export function countUnique(orderNumbers) {
	let counts = [];
	for (let i = 0; i < orderNumbers.length; i++) {
		counts[orderNumbers[i]] = 1 + (counts[orderNumbers[i]] || 0);
	}
	return counts;
}


export const getUserAgent = () => {
	const platform = os.version && os.version() || process.platform;
	const arch = os.arch();
	const nodeVersion = `${process.release.name} ${process.versions.node}`;
	const openSslVersion = `OpenSSL/${process.versions.openssl}`;
	return `TaxJar/Node (${[platform, arch, nodeVersion, openSslVersion].join("; ")})`;
};


export const strCol = (val) => val ? `"${val}"` : null;

export function formatSQL(query) {
	query = query?.replace(/\t/, " ");
	query = query?.replace(/\n/, " ");
	query = query?.replace(/\s+/g, " ");
	return query;
}

export function syntaxHighlight(json) {
	if (typeof json != "string") {
		json = JSON.stringify(json, undefined, 2);
	}
	json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
		let cls = "number";
		if (/^"/.test(match)) {
			if (/:$/.test(match)) {
				cls = "key";
			} else {
				cls = "string";
			}
		} else if (/true|false/.test(match)) {
			cls = "boolean";
		} else if (/null/.test(match)) {
			cls = "null";
		}
		return "<span class=\"" + cls + "\">" + match + "</span>";
	});
}

