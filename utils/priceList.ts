// You can store your price IDs from Stripe here

const Prices = {
	personal: {
		monthly: {
			id: 'price_1J5q2yDMjD0UnVmMXzEWYDnl',
			desc: 'Personal plan (monthly)',
		},
		annually: {
			id: 'price_1J5q45DMjD0UnVmMQxXHKGAv',
			desc: 'Personal plan (annually)',
		},
	},
	team: {
		monthly: {
			id: 'price_1J5q3GDMjD0UnVmMlHc5Eedq',
			desc: 'Team plan (monthly)',
		},
		annually: {
			id: 'price_1J5q8zDMjD0UnVmMqsngM91X',
			desc: 'Team plan (annually)',
		},
	},
	pro: {
		monthly: {
			id: 'price_1J6KRuDMjD0UnVmMIItaOdT3',
			desc: 'Pro plan (monthly)',
		},
		annually: {
			id: 'price_1J5q9VDMjD0UnVmMIQtVDSZ9',
			desc: 'Pro plan (annually)',
		},
	},
};

const PriceIds: { [index: string]: any } = {
	price_1J5q2yDMjD0UnVmMXzEWYDnl: 'Personal plan (monthly)',
	price_1J5q45DMjD0UnVmMQxXHKGAv: 'Personal plan (annually)',
	price_1J5q3GDMjD0UnVmMlHc5Eedq: 'Team plan (monthly)',
	price_1J5q8zDMjD0UnVmMqsngM91X: 'Team plan (annually)',
	price_1J6KRuDMjD0UnVmMIItaOdT3: 'Pro plan (monthly)',
	price_1J5q9VDMjD0UnVmMIQtVDSZ9: 'Pro plan (annually)',
};

export { Prices, PriceIds };
