// You can store your price IDs from Stripe here

const Prices = {
  personal: {
    monthly: {
      id: "price_1J5q2yDMjD0UnVmMXzEWYDnl",
      desc: "Personal plan (monthly)",
    },
    anually: {
      id: "price_1J5q45DMjD0UnVmMQxXHKGAv",
      desc: "Personal plan (anually)",
    },
  },
  team: {
    monthly: {
      id: "price_1J5q3GDMjD0UnVmMlHc5Eedq",
      desc: "Team plan (monthly)",
    },
    anually: {
      id: "price_1J5q8zDMjD0UnVmMqsngM91X",
      desc: "Team plan (anually)",
    },
  },
  pro: {
    monthly: {
      id: "price_1J5q3TDMjD0UnVmMJKX3nkDq",
      desc: "Pro plan (monthly)",
    },
    anually: {
      id: "price_1J5q9VDMjD0UnVmMIQtVDSZ9",
      desc: "Pro plan (anually)",
    },
  },
};

const PriceIds = {
  price_1J5q2yDMjD0UnVmMXzEWYDnl: "Personal plan (monthly)",
  price_1J5q45DMjD0UnVmMQxXHKGAv: "Personal plan (anually)",
  price_1J5q3GDMjD0UnVmMlHc5Eedq: "Team plan (monthly)",
  price_1J5q8zDMjD0UnVmMqsngM91X: "Team plan (anually)",
  price_1J5q3TDMjD0UnVmMJKX3nkDq: "Pro plan (monthly)",
  price_1J5q9VDMjD0UnVmMIQtVDSZ9: "Pro plan (anually)",
};

export { Prices, PriceIds };
