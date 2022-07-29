function extractProperties() {
	let rows = [...document.querySelectorAll('article')].map(x => {
		let priceText = x.querySelector('div.price-row span.item-price')?.innerText
		let price = Number(priceText?.replace(',', '').replace('€', ''))
		let m2Text = x.querySelector('div.item-detail-char span:nth-child(2)')?.innerText
		m2Text = m2Text ? m2Text.split('').filter(a => a >= '0' && a <= '9').join('') : null
		let m2 = Number(m2Text)
		let link = x.querySelector('div.item-info-container a.item-link')
		return {
			// el: x,
			name: link?.innerText,
			link: link?.href,
			priceText,
			price,
			m2Text,
			m2,
			pm2: (price/m2).toFixed(2),
		}
	}).filter(x => x.priceText);

	console.table(rows)
	return rows
}

async function sendToTracker(row) {
	const postData = {
		name: row.name,
		url: row.link,
		price: row.price,
		area: row.m2,
	}
	const res = await fetch('http://localhost:3000/api/post', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(postData)
	});
	console.log(await res.json())
}

const rows = extractProperties();
rows.map(sendToTracker)
