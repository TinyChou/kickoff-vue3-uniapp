import { describe, it, expect } from 'vitest'
import { formatWithComma } from './number-format'

describe('number-format', () => {
  it('should be OK with negative numbers', () => {
    expect(formatWithComma(-12345678)).toMatchInlineSnapshot('"-12,345,678"')
    expect(formatWithComma(-12.45678)).toMatchInlineSnapshot('"-12"')
  })
  it('should be OK with positive numbers', () => {
    expect(formatWithComma(123456789)).toMatchInlineSnapshot('"123,456,789"')
    expect(formatWithComma(12345.6789)).toMatchInlineSnapshot('"12,346"')
  })
  it('should be OK with zeros', () => {
    expect(formatWithComma(0.0)).toMatchInlineSnapshot('"0"')
    expect(formatWithComma(0)).toMatchInlineSnapshot('"0"')
  })
})
