import { getGjson } from './getGjson'

describe('Check GeoJson feature returned', function () {
  test('Returns feature with coords in 27700', () => {
    const ftr = getGjson('SD34', 'gb')
    expect(ftr.geometry.coordinates[0]).toHaveLength(5)
  })
  test('Returns feature with coords in 4326', () => {
    const ftr = getGjson('SD34', 'wg')
    console.log(ftr)
    expect(ftr.geometry.coordinates[0]).toHaveLength(5)
  })
})
