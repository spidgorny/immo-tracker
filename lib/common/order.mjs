export function cleanPreFixAndSuffixFromOrderNumber(orderNumber) {
	orderNumber = orderNumber.replace("-FR", "");
	orderNumber = orderNumber.replace("-1", "");
	orderNumber = orderNumber.replace("-2", "");
	orderNumber = orderNumber.replace("-3", "");
	orderNumber = orderNumber.replace("-LV", "");
	const cleanOrderNumber = orderNumber.replace("-FBA", "");
	return cleanOrderNumber;
}
