import { getGjson } from './getGjson'

describe('Check GeoJson feature returned', function () {
  test('returns a feature object', () => {
    const ftr = getGjson('SD34', 'gb')
    expect(ftr.geometry.coordinates).toHaveLength(5)
  })
})
