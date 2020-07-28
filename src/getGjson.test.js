import { getGjson } from './getGjson'

describe('Check GeoJson feature returned', function () {
  test('Returns square feature with coords in 27700', () => {
    const geom = getGjson('SD34', 'gb', 'square')
    expect(geom.coordinates[0]).toHaveLength(5)
  })
  test('Returns square feature with coords in 4326', () => {
    const geom = getGjson('SD34', 'wg', 'square')
    //console.log(geom.coordinates[0])
    expect(geom.coordinates[0]).toHaveLength(5)
  })
  test('Returns up traingle feature with coords in 4326', () => {
    const geom = getGjson('SD34', 'wg', 'triangle-up')
    //console.log(geom.coordinates[0])
    expect(geom.coordinates[0]).toHaveLength(4)
  })
  test('Returns down traingle feature with coords in 4326', () => {
    const geom = getGjson('SD34', 'wg', 'triangle-down')
    //console.log(geom.coordinates[0])
    expect(geom.coordinates[0]).toHaveLength(4)
  })
  test('Returns diamond feature with coords in 4326', () => {
    const geom = getGjson('SD34', 'wg', 'diamond')
    //console.log(geom.coordinates[0])
    expect(geom.coordinates[0]).toHaveLength(5)
  })
  test('Returns cross feature with coords in 4326', () => {
    const geom = getGjson('SD34', 'wg', 'cross')
    //console.log(geom.coordinates)
    expect(geom.coordinates).toHaveLength(3)
  })
  test('Returns circle feature with coords in 4326', () => {
    const geom = getGjson('SD34', 'wg', 'circle')
    //console.log(geom.coordinates[0])
    expect(geom.coordinates[0]).toHaveLength(25)
  })
})
