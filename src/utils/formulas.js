export function calculateSIP(monthly, rate, years) {
  const r = rate / 12 / 100
  const n = years * 12
  return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
}

export function generateSipData(monthly, rate, years) {
  const r = rate / 12 / 100
  const months = years * 12

  let total = 0
  let data = []

  for (let i = 1; i <= months; i++) {
    total = (total + monthly) * (1 + r)

    data.push({
      month: i,
      value: Math.round(total)
    })
  }

  return data
}

export function calculateEMI(principal, rate, years) {
  const r = rate / 12 / 100
  const n = years * 12
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

export function generateEmiBreakdown(principal, rate, years) {
  const r = rate / 12 / 100
  const n = years * 12

  const emi =
    (principal * r * Math.pow(1 + r, n)) /
    (Math.pow(1 + r, n) - 1)

  let balance = principal
  let totalInterest = 0

  for (let i = 0; i < n; i++) {
    const interest = balance * r
    const principalPaid = emi - interest

    totalInterest += interest
    balance -= principalPaid
  }

  return [
    { name: "Principal", value: Math.round(principal) },
    { name: "Interest", value: Math.round(totalInterest) },
  ]
}

export function calculateLumpSum(amount, rate, years) {
  return amount * Math.pow(1 + rate / 100, years)
}