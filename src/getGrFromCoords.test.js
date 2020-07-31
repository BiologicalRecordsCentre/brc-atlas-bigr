import { getGrFromCoords } from './getGrFromCoords.js'

describe('Check GRs returned from eastings and northings (or long/lats)', function () {

  test('Correct British GRs returned at all precisions for British easting northing #1', () => {
    const grs =   getGrFromCoords(334550, 467850, 'gb', 'gb', [100000, 10000, 5000, 2000, 1000, 100, 10, 1])
    expect(grs).toEqual({
      p100000: 'SD',
      p10000: 'SD36',
      p5000: 'SD36NW',
      p2000: 'SD36N',
      p1000: 'SD3467',
      p100: 'SD345678',
      p10: 'SD34556785',
      p1: 'SD3455067850'});
  })

  test('Correct British GRs returned at all precisions for British easting northing #2', () => {
    const grs = getGrFromCoords(352293, 394220, 'gb', 'gb', [100000, 10000, 5000, 2000, 1000, 100, 10, 1])
    expect(grs).toEqual({
      p100000: 'SJ', 
      p10000: 'SJ59', 
      p5000: 'SJ59SW', 
      p2000: 'SJ59H', 
      p1000: 'SJ5294', 
      p100: 'SJ522942', 
      p10: 'SJ52299422', 
      p1: 'SJ5229394220'});
  })

  test('Check that GRs from bottom left corner of 100 km square are of proper length', () => {
    const grs = getGrFromCoords(400000.5, 200000.5, 'gb', 'gb', [100000, 10000, 5000, 2000, 1000, 100, 10, 1])
    expect(grs).toEqual({
      p100000: 'SP',
      p10000: 'SP00',
      p5000: 'SP00SW',
      p2000: 'SP00A',
      p1000: 'SP0000',
      p100: 'SP000000',
      p10: 'SP00000000',
      p1: 'SP0000000000'});
  })

  test('Correct British GRs returned at all precisions for WGS84 long lats', () => {
    const grs = getGrFromCoords(-2.71968720, 53.44258395, 'wg', 'gb', [100000, 10000, 5000, 2000, 1000, 100, 10, 1])
    expect(grs).toEqual({
      p100000: 'SJ', 
      p10000: 'SJ59', 
      p5000: 'SJ59SW', 
      p2000: 'SJ59H', 
      p1000: 'SJ5294', 
      p100: 'SJ522942', 
      p10: 'SJ52299422', 
      p1: 'SJ5229394220'});
  })

  test('Correct Irish GRs returned at all precisions for Irish easting northing', () => {
    const grs = getGrFromCoords(204024, 253038, 'ir', 'ir', [100000, 10000, 5000, 2000, 1000, 100, 10, 1])
    expect(grs).toEqual({
      p100000: 'N', 
      p10000: 'N05', 
      p5000: 'N05SW', 
      p2000: 'N05L', 
      p1000: 'N0453', 
      p100: 'N040530', 
      p10: 'N04025303', 
      p1: 'N0402453038'});
  })

  test('Correct Irish GRs returned at all precisions for WGS84 long lats', () => {
    const grs = getGrFromCoords(-7.94005389, 53.52749715, 'wg', 'ir', [100000, 10000, 5000, 2000, 1000, 100, 10, 1])
    expect(grs).toEqual({
      p100000: 'N', 
      p10000: 'N05', 
      p5000: 'N05SW', 
      p2000: 'N05L', 
      p1000: 'N0453', 
      p100: 'N040530', 
      p10: 'N04025303', 
      p1: 'N0402453038'});
  })

  test('Correct CI GRs returned at all precisions for CI easting and northings', () => {

    const grs = getGrFromCoords(530769, 5476923, 'ci', 'ci', [100000, 10000, 5000, 2000, 1000, 100, 10, 1])
    expect(grs).toEqual({
      p100000: 'WV',
      p10000: 'WV37',
      p5000: 'WV37NW',
      p2000: 'WV37D',
      p1000: 'WV3076',
      p100: 'WV307769',
      p10: 'WV30767692',
      p1: 'WV3076976923'});
  })

  test('Null GRs returned when easting northing not within grid range of output projection', () => {
    const grs = getGrFromCoords(400000.5, 200000.5, 'gb', 'ir', [100000, 10000, 5000, 2000, 1000, 100, 10, 1])
    expect(grs).toEqual({
      p100000: null,
      p10000: null,
      p5000: null,
      p2000: null,
      p1000: null,
      p100: null,
      p10: null,
      p1: null});
  })
})

