export function formatDate(string: any) {
  return new Date(string).toDateString().slice(3, 16)
}

export function getNumberOfRestArgs([first, ...rest]: [any, any[]]) {
  return `${first.name}${rest.length ? ` + ${rest.length}` : ''}`
}

export function roundToCrores(val: any) {
  let value
  if (val >= 10000000) {
    value = Math.round(val / 10000000) + ' Cr'
  } else if (val >= 100000) {
    value = Math.round(val / 100000) + ' Lac'
  } else if (val >= 1000) {
    value = Math.round(val / 1000) + ' Lac'
  }
  return value
}

export function getDayName(date: any) {
  return new Date(date).toLocaleDateString('en-In', { weekday: 'long' })
}

export const percentage = (percent: any, total: any) => {
  return Number(((percent / 100) * total).toFixed(2))
}

export function calculateFee(price: any) {
  let bidboliFee = 0
  let listingFee = 0
  let totalFee = 0
  if (price > 0 || price <= 50000000) {
    listingFee = percentage(2, price)
    bidboliFee = percentage(1, price)
  } else if (price > 50000000 || price <= 250000000) {
    listingFee = percentage(1.5, price)
    bidboliFee = percentage(1, price)
  } else {
    listingFee = percentage(1, price)
    bidboliFee = percentage(1, price)
  }
  totalFee = listingFee + bidboliFee

  return { listingFee, bidboliFee, totalFee }
}
