import { getCentroid } from './getCentroid'

// Check invalid GRs correctly dealt with
test('getCentroid throws correct error for invalid GR XX', () => {
  let msg = ''
  try {getCentroid('XX', 'gb')}
  catch(err) {msg = err}
  finally {expect(msg).toBe('The value \'XX\' is not recognised as a valid grid reference.')}
})
test('getCentroid throws correct error for invalid GR 3456', () => {
  let msg = ''
  try {getCentroid('3456', 'gb')}
  catch(err) {msg = err}
  finally {expect(msg).toBe('The value \'3456\' is not recognised as a valid grid reference.')}
})
test('getCentroid throws correct error for invalid GR SD354', () => {
  let msg = ''
  try {getCentroid('SD354', 'gb')}
  catch(err) {msg = err}
  finally {expect(msg).toBe('The value \'SD354\' is not recognised as a valid grid reference.')}
})

// Test that correct projection string is returned
test('getCentroid returns "gb" projection for "SO" regardless of output coord projection', () => {
  expect(getCentroid('SO', 'gb').proj).toBe('gb')
  expect(getCentroid('SO', 'ir').proj).toBe('gb')
  expect(getCentroid('SO', 'ci').proj).toBe('gb')
})

test('getCentroid returns "ir" projection for "X" regardless of output coord projection', () => {
  expect(getCentroid('X', 'gb').proj).toBe('ir')
  expect(getCentroid('X', 'ir').proj).toBe('ir')
  expect(getCentroid('X', 'ci').proj).toBe('ir')
})

test('getCentroid returns "ci" projection for "WA" regardless of output coord projection', () => {
  expect(getCentroid('WA', 'gb').proj).toBe('ci')
  expect(getCentroid('WA', 'ir').proj).toBe('ci')
  expect(getCentroid('WA', 'ci').proj).toBe('ci')
})

// Test that correct GB coords are returned for GB GRs 
test('getCentroid returns correct GB coords for GB 100 km GR', () => {
  expect(Math.floor(getCentroid('SE', 'gb').centroid[0])).toBe(450000)
  expect(Math.floor(getCentroid('SE', 'gb').centroid[1])).toBe(450000)
})
test('getCentroid returns correct GB coords for GB 10 km GR', () => {
  expect(Math.floor(getCentroid('SE23', 'gb').centroid[0])).toBe(425000)
  expect(Math.floor(getCentroid('SE23', 'gb').centroid[1])).toBe(435000)
})
test('getCentroid returns correct GB coords for GB 5 km GR', () => {
  expect(Math.floor(getCentroid('SE55SW', 'gb').centroid[0])).toBe(452500)
  expect(Math.floor(getCentroid('SE55SW', 'gb').centroid[1])).toBe(452500)
})
test('getCentroid returns correct GB coords for GB 2 km GR', () => {
  expect(Math.floor(getCentroid('SE55G', 'gb').centroid[0])).toBe(453000)
  expect(Math.floor(getCentroid('SE55G', 'gb').centroid[1])).toBe(453000)
})
test('getCentroid returns correct GB coords for GB 1 km GR', () => {
  expect(Math.floor(getCentroid('SE4576', 'gb').centroid[0])).toBe(445500)
  expect(Math.floor(getCentroid('SE4576', 'gb').centroid[1])).toBe(476500)
})
test('getCentroid returns correct GB coords for GB 6 fig GR', () => {
  expect(Math.floor(getCentroid('SE756435', 'gb').centroid[0])).toBe(475650)
  expect(Math.floor(getCentroid('SE756435', 'gb').centroid[1])).toBe(443550)
})
test('getCentroid returns correct GB coords for GB 8 fig GR', () => {
  expect(Math.floor(getCentroid('SE84756246', 'gb').centroid[0])).toBe(484755)
  expect(Math.floor(getCentroid('SE84756246', 'gb').centroid[1])).toBe(462465)
})
test('getCentroid returns correct GB coords for GB 10 fig GR', () => {
  expect(Math.floor(getCentroid('SE9834274652', 'gb').centroid[0])).toBe(498342)
  expect(Math.floor(getCentroid('SE9834274652', 'gb').centroid[1])).toBe(474652)
})

// Test that correct GB coords are returned for IR GRs 
test('getCentroid returns correct GB coords for IR 100 km GR', () => {
  expect(Math.floor(getCentroid('N', 'gb').centroid[0])).toBe(52143)
  expect(Math.floor(getCentroid('N', 'gb').centroid[1])).toBe(412950)
})
test('getCentroid returns correct GB coords for IR 10 km GR', () => {
  expect(Math.floor(getCentroid('N20', 'gb').centroid[0])).toBe(23420)
  expect(Math.floor(getCentroid('N20', 'gb').centroid[1])).toBe(370157)
})
test('getCentroid returns correct GB coords for IR 5 km GR', () => {
  expect(Math.floor(getCentroid('N99NE', 'gb').centroid[0])).toBe(103523)
  expect(Math.floor(getCentroid('N99NE', 'gb').centroid[1])).toBe(456308)
})
test('getCentroid returns correct GB coords for IR 2 km GR', () => {
  expect(Math.floor(getCentroid('N00J', 'gb').centroid[0])).toBe(1801)
  expect(Math.floor(getCentroid('N00J', 'gb').centroid[1])).toBe(375994)
})
test('getCentroid returns correct GB coords for IR 1 km GR', () => {
  expect(Math.floor(getCentroid('N6453', 'gb').centroid[0])).toBe(66901)
  expect(Math.floor(getCentroid('N6453', 'gb').centroid[1])).toBe(415220)
})
test('getCentroid returns correct GB coords for IR 6 fig GR', () => {
  expect(Math.floor(getCentroid('N254958', 'gb').centroid[0])).toBe(31527)
  expect(Math.floor(getCentroid('N254958', 'gb').centroid[1])).toBe(460764)
})
test('getCentroid returns correct GB coords for IR 8 fig GR', () => {
  expect(Math.floor(getCentroid('N99871287', 'gb').centroid[0])).toBe(98763)
  expect(Math.floor(getCentroid('N99871287', 'gb').centroid[1])).toBe(371735)
})
test('getCentroid returns correct GB coords for IR 10 fig GR', () => {
  expect(Math.floor(getCentroid('N0099724137', 'gb').centroid[0])).toBe(1074)
  expect(Math.floor(getCentroid('N0099724137', 'gb').centroid[1])).toBe(391270)
})

// Test that correct GB coords are returned for CI GRs 
test('getCentroid returns correct GB coords for CI 100 km GR', () => {
  expect(Math.floor(getCentroid('WV', 'gb').centroid[0])).toBe(377247)
  expect(Math.floor(getCentroid('WV', 'gb').centroid[1])).toBe(-77721)
})
test('getCentroid returns correct GB coords for CI 10 km GR', () => {
  expect(Math.floor(getCentroid('WV65', 'gb').centroid[0])).toBe(392311)
  expect(Math.floor(getCentroid('WV65', 'gb').centroid[1])).toBe(-72919)
})
test('getCentroid returns correct GB coords for CI 5 km GR', () => {
  expect(Math.floor(getCentroid('WA50NE', 'gb').centroid[0])).toBe(385509)
  expect(Math.floor(getCentroid('WA50NE', 'gb').centroid[1])).toBe(-20325)
})
test('getCentroid returns correct GB coords for CI 2 km GR', () => {
  expect(Math.floor(getCentroid('WV27Y', 'gb').centroid[0])).toBe(356605)
  expect(Math.floor(getCentroid('WV27Y', 'gb').centroid[1])).toBe(-50444)
})
test('getCentroid returns correct GB coords for CI 1 km GR', () => {
  expect(Math.floor(getCentroid('WV4575', 'gb').centroid[0])).toBe(373085)
  expect(Math.floor(getCentroid('WV4575', 'gb').centroid[1])).toBe(-52163)
})
test('getCentroid returns correct GB coords for CI 6 fig GR', () => {
  expect(Math.floor(getCentroid('WV463758', 'gb').centroid[0])).toBe(373939)
  expect(Math.floor(getCentroid('WV463758', 'gb').centroid[1])).toBe(-51824)
})
test('getCentroid returns correct GB coords for CI 8 fig GR', () => {
  expect(Math.floor(getCentroid('WV46317577', 'gb').centroid[0])).toBe(373903)
  expect(Math.floor(getCentroid('WV46317577', 'gb').centroid[1])).toBe(-51899)
})
test('getCentroid returns correct GB coords for CI 10 fig GR', () => {
  expect(Math.floor(getCentroid('WV4631075769', 'gb').centroid[0])).toBe(373899)
  expect(Math.floor(getCentroid('WV4631075769', 'gb').centroid[1])).toBe(-51904)
})