export function downloadBase64(data, filename) {
	data = Buffer.from(data).toString("base64");
	const link = document.createElement("a");
	link.href = `data:application/pdf;base64,${data}`;
	link.download = filename;
	link.target = "_blank";
	link.click();
}

export function downloadNewTab(dataurl, filename) {
	window.open(dataurl, "_blank");
}

export function downloadBlob(data) {
	const file = new Blob([data], { type: "application/pdf" });
	const fileURL = URL.createObjectURL(file);
	window.open(fileURL);
}

export function postForm(url, payload) {
	const form = document.createElement("form");
	form.action = url;
	form.method = "post";
	// form.target = "_blank";

	Object.entries(payload).forEach(([key, val]) => {
		const input = document.createElement("input");
		input.name = key;
		input.value = val;
		form.appendChild(input);
	});

	document.body.appendChild(form);
	form.submit();
	form.remove();
}
