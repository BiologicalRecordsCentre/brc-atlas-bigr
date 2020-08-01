import { pntToArea } from './pntToArea'

describe('Check correct areas returned for lon lats', function () {
  test('Returns code gb for lon lat in British grid area #1', () => {
    expect(pntToArea(-2, 50)).toBe('gb')
  })
  test('Returns code gb for lon lat in British grid area #2', () => {
    expect(pntToArea(-4.234, 58.7734)).toBe('gb')
  })
  test('Returns code gb for lon lat in British grid area #3', () => {
    expect(pntToArea(-6.8, 50.346)).toBe('gb')
  })
  test('Returns code gb for lon lat in British grid area #4', () => {
    expect(pntToArea(2.231324, 53.123)).toBe('gb')
  })

  test('Returns code ir for lon lat in Irish grid area #1', () => {
    expect(pntToArea(-10.345, 54.678)).toBe('ir')
  })
  test('Returns code ir for lon lat in Irish grid area #2', () => {
    expect(pntToArea(-5.984, 55.123)).toBe('ir')
  })
  test('Returns code ir for lon lat in Irish grid area #3', () => {
    expect(pntToArea(-10.547, 51.987)).toBe('ir')
  })
  test('Returns code ir for lon lat in Irish grid area #4', () => {
    expect(pntToArea(-5.9, 52.56)).toBe('ir')
  })

  test('Returns code ci for lon lat in Channel Islands grid area #1', () => {
    expect(pntToArea(-2.69, 49.7)).toBe('ci')
  })
  test('Returns code ci for lon lat in Channel Islands grid area #2', () => {
    expect(pntToArea(-1.84, 48.96)).toBe('ci')
  })

  test('Returns null for lon lat outside all areas #1', () => {
    expect(pntToArea(-7.23, 50.95)).toBe(null)
  })
  test('Returns null for lon lat outside all areas #2', () => {
    expect(pntToArea(-9.05, 56.065)).toBe(null)
  })

})
