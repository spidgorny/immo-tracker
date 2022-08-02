

export function removeDots(str) {
	return str.replace(/\./g, "");
}

export function capitalizeEveryWord(str) {
	return str
		.split(/\s/)
		.map((x) => capitalizeFirstLetter(x))
		.join(" ");
}

export function capitalizeFirstLetter(text) {
	if (!text) {
		return text;
	}
	const temp = text.split(" ").filter(x => x !== ".").map(word =>
		word.length > 0
			? word[0].toUpperCase() + word.substring(1).toLowerCase()
			: word).join(" ").trim();

	return temp.replace(/\./g, " ");
}


export function capitalizeString(str) {
	if (!str) return str;
	return str
		.split(" ")
		.map((e) => capitalizeFirstLetter(e))
		.join(" ");
}


export function adjustFirstLastName(val) {
	if (!val) return null;
	const valNoWhitespaces = val.trim();
	const valNoDots = removeDots(valNoWhitespaces);
	return capitalizeFirstLetter(valNoDots);
}
