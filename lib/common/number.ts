export function niceMoney(amount: number) {
	return '€ ' + amount.toLocaleString('en-DE', {
		currency:	'EUR',
		// currencySign: ''
	})
}
