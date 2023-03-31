export function formatWithComma(num: number): string {
  if (!Number.isInteger(num)) {
    num = Math.round(num)
  }

  if (num === 0) return String(num)
  const prefix = num < 0 ? '-' : ''
  const str = num < 0 ? String(num).slice(1) : String(num)
  return prefix + str.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}
