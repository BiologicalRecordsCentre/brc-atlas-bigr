import { getLowerResGrs } from './getLowerResGrs.js'

describe('Check lower resolution grid references returned from a grid reference', function () {

  test('Correct British GRs returned for 10 fig GR', () => {
    const grs = getLowerResGrs('SD3455067850')
    expect(grs).toEqual({
      p100000: 'SD',
      p10000: 'SD36',
      p5000: ['SD36NW'],
      p2000: 'SD36N',
      p1000: 'SD3467',
      p100: 'SD345678',
      p10: 'SD34556785',
      p1: 'SD3455067850'});
  })

  test('Correct British GRs returned for 8 fig GR', () => {
    const grs = getLowerResGrs('SD34556785')
    expect(grs).toEqual({
      p100000: 'SD',
      p10000: 'SD36',
      p5000: ['SD36NW'],
      p2000: 'SD36N',
      p1000: 'SD3467',
      p100: 'SD345678',
      p10: 'SD34556785',
      p1: null});
  })

  test('Correct British GRs returned for 6 fig GR', () => {
    const grs = getLowerResGrs('SD345678')
    expect(grs).toEqual({
      p100000: 'SD',
      p10000: 'SD36',
      p5000: ['SD36NW'],
      p2000: 'SD36N',
      p1000: 'SD3467',
      p100: 'SD345678',
      p10: null,
      p1: null});
  })

  test('Correct British GRs returned for monad GR', () => {
    const grs = getLowerResGrs('SD3467')
    expect(grs).toEqual({
      p100000: 'SD',
      p10000: 'SD36',
      p5000: ['SD36NW'],
      p2000: 'SD36N',
      p1000: 'SD3467',
      p100: null,
      p10: null,
      p1: null});
  })

  test('Correct British GRs returned for tetrad GR', () => {
    const grs = getLowerResGrs('SD36N')
    expect(grs).toEqual({
      p100000: 'SD',
      p10000: 'SD36',
      p5000: ['SD36NW', 'SD36NE'],
      p2000: 'SD36N',
      p1000: null,
      p100: null,
      p10: null,
      p1: null});
  })

  test('Correct British GRs returned for quadrant GR', () => {
    const grs = getLowerResGrs('SD36NW')
    expect(grs).toEqual({
      p100000: 'SD',
      p10000: 'SD36',
      p5000: ['SD36NW'],
      p2000: null,
      p1000: null,
      p100: null,
      p10: null,
      p1: null});
  })

  test('Correct British GRs returned for hectad GR', () => {
    const grs = getLowerResGrs('SD36')
    expect(grs).toEqual({
      p100000: 'SD',
      p10000: 'SD36',
      p5000: null,
      p2000: null,
      p1000: null,
      p100: null,
      p10: null,
      p1: null});
  })

  test('Correct British GRs returned for 100 km GR', () => {
    const grs = getLowerResGrs('SD')
    expect(grs).toEqual({
      p100000: 'SD',
      p10000: null,
      p5000: null,
      p2000: null,
      p1000: null,
      p100: null,
      p10: null,
      p1: null});
  })

  test('Correct British GRs returned for tetrad that overlaps single quadrant', () => {
    const grs = getLowerResGrs('SD36G')
    expect(grs).toEqual({
      p100000: 'SD',
      p10000: 'SD36',
      p5000: ['SD36SW'],
      p2000: 'SD36G',
      p1000: null,
      p100: null,
      p10: null,
      p1: null});
  })

  test('Correct British GRs returned for tetrad that overlaps two quadrants - NW & SW', () => {
    const grs = getLowerResGrs('SD36H')
    expect(grs).toEqual({
      p100000: 'SD',
      p10000: 'SD36',
      p5000: ['SD36SW', 'SD36NW'],
      p2000: 'SD36H',
      p1000: null,
      p100: null,
      p10: null,
      p1: null});
  })

  test('Correct British GRs returned for tetrad that overlaps two quadrants - NW & NE', () => {
    const grs = getLowerResGrs('SD36P')
    expect(grs).toEqual({
      p100000: 'SD',
      p10000: 'SD36',
      p5000: ['SD36NW', 'SD36NE'],
      p2000: 'SD36P',
      p1000: null,
      p100: null,
      p10: null,
      p1: null});
  })

  test('Correct British GRs returned for tetrad that overlaps two quadrants - SE & NE', () => {
    const grs = getLowerResGrs('SD36X')
    expect(grs).toEqual({
      p100000: 'SD',
      p10000: 'SD36',
      p5000: ['SD36SE', 'SD36NE'],
      p2000: 'SD36X',
      p1000: null,
      p100: null,
      p10: null,
      p1: null});
  })

  test('Correct British GRs returned for tetrad that overlaps two quadrants - SE & SW', () => {
    const grs = getLowerResGrs('SD36K')
    expect(grs).toEqual({
      p100000: 'SD',
      p10000: 'SD36',
      p5000: ['SD36SW', 'SD36SE'],
      p2000: 'SD36K',
      p1000: null,
      p100: null,
      p10: null,
      p1: null});
  })

  test('Correct British GRs returned for tetrad that overlaps four quadrants', () => {
    const grs = getLowerResGrs('SD36M')
    expect(grs).toEqual({
      p100000: 'SD',
      p10000: 'SD36',
      p5000: ['SD36SW', 'SD36SE', 'SD36NW', 'SD36NE'],
      p2000: 'SD36M',
      p1000: null,
      p100: null,
      p10: null,
      p1: null});
  })
})