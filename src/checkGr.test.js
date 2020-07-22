import { checkGr } from './checkGr'

describe('Check invalid GRs correctly dealt with', function () {
  test('checkGr throws correct error for invalid GR XX', () => {
    let msg = ''
    try {checkGr('XX')}
    catch(err) {msg = err}
    finally {expect(msg).toBe('The value \'XX\' is not recognised as a valid grid reference.')}
  })
  test('getCentroid throws correct error for invalid GR 3456', () => {
    let msg = ''
    try {checkGr('3456')}
    catch(err) {msg = err}
    finally {expect(msg).toBe('The value \'3456\' is not recognised as a valid grid reference.')}
  })
  test('getCentroid throws correct error for invalid GR SD354', () => {
    let msg = ''
    try {checkGr('SD354')}
    catch(err) {msg = err}
    finally {expect(msg).toBe('The value \'SD354\' is not recognised as a valid grid reference.')}
  })
})

// describe('Check that correct projection string is returned', function () {
//   test('getCentroid returns "gb" projection for "SO" regardless of output coord projection', () => {
//     expect(getCentroid('SO', 'gb').proj).toBe('gb')
//     expect(getCentroid('SO', 'ir').proj).toBe('gb')
//     expect(getCentroid('SO', 'ci').proj).toBe('gb')
//   })

//   test('getCentroid returns "ir" projection for "X" regardless of output coord projection', () => {
//     expect(getCentroid('X', 'gb').proj).toBe('ir')
//     expect(getCentroid('X', 'ir').proj).toBe('ir')
//     expect(getCentroid('X', 'ci').proj).toBe('ir')
//   })

//   test('getCentroid returns "ci" projection for "WA" regardless of output coord projection', () => {
//     expect(getCentroid('WA', 'gb').proj).toBe('ci')
//     expect(getCentroid('WA', 'ir').proj).toBe('ci')
//     expect(getCentroid('WA', 'ci').proj).toBe('ci')
//   })
// })


