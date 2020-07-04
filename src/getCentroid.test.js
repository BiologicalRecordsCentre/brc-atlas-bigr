import { getCentroid } from './getCentroid'

//
test('getCentroid return "gb" projection for "SO"', () => {
  expect(getCentroid('SO', 'gb').proj).toBe('gb')
  expect(getCentroid('SO', 'ir').proj).toBe('gb')
  expect(getCentroid('SO', 'ci').proj).toBe('gb')
})

test('getCentroid return "ir" projection for "X"', () => {
  expect(getCentroid('X', 'gb').proj).toBe('ir')
  expect(getCentroid('X', 'ir').proj).toBe('ir')
  expect(getCentroid('X', 'ci').proj).toBe('ir')
})

test('getCentroid return "ci" projection for "WA"', () => {
  expect(getCentroid('WA', 'gb').proj).toBe('ci')
  expect(getCentroid('WA', 'ir').proj).toBe('ci')
  expect(getCentroid('WA', 'ci').proj).toBe('ci')
})