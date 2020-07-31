import { checkGr } from './checkGr'

describe('Check invalid GRs correctly dealt with', function () {
  test('checkGr throws correct error for invalid GR XX', () => {
    let msg = ''
    try {checkGr('XX')}
    catch(err) {msg = err}
    finally {expect(msg).toBe('The value \'XX\' is not recognised as a valid grid reference.')}
  })
  test('checkGr throws correct error for invalid GR 3456', () => {
    let msg = ''
    try {checkGr('3456')}
    catch(err) {msg = err}
    finally {expect(msg).toBe('The value \'3456\' is not recognised as a valid grid reference.')}
  })
  test('checkGr throws correct error for invalid GR SD354', () => {
    let msg = ''
    try {checkGr('SD354')}
    catch(err) {msg = err}
    finally {expect(msg).toBe('The value \'SD354\' is not recognised as a valid grid reference.')}
  })
})

describe('Check return values of checkGr for GB GRs', function () {

  test('Check British 100 km grid ref', () => {
    expect(checkGr('SD')).toEqual({
      precision: 100000,
      prefix: 'SD',
      projection: 'gb'});
  })

  test('Check British 10 km grid ref', () => {
    expect(checkGr('SD34')).toEqual({
      precision: 10000,
      prefix: 'SD',
      projection: 'gb'});
  })
  test('Check British 5 km grid ref', () => {
    expect(checkGr('SJ45SW')).toEqual({
      precision: 5000,
      prefix: 'SJ',
      projection: 'gb'});
  })

  test('Check British 2 km grid ref', () => {
    expect(checkGr('TQ00A')).toEqual({
      precision: 2000,
      prefix: 'TQ',
      projection: 'gb'});
  })

  test('Check British 1 km grid ref', () => {
    expect(checkGr('SK9769')).toEqual({
      precision: 1000,
      prefix: 'SK',
      projection: 'gb'});
  })

  test('Check British 6 fig grid ref SD34', () => {
    expect(checkGr('TM897654')).toEqual({
      precision: 100,
      prefix: 'TM',
      projection: 'gb'});
  })

  test('Check British 8 fig grid ref SD34', () => {
    expect(checkGr('SO89734654')).toEqual({
      precision: 10,
      prefix: 'SO',
      projection: 'gb'});
  })

  test('Check British 10 fig grid ref SD34', () => {
    expect(checkGr('SJ8938767654')).toEqual({
      precision: 1,
      prefix: 'SJ',
      projection: 'gb'});
  })
})

describe('Check return values of checkGr for Irish GRs', function () {

  test('Check Irish 100 km grid ref', () => {
    expect(checkGr('D')).toEqual({
      precision: 100000,
      prefix: 'D',
      projection: 'ir'});
  })

  test('Check Irish 10 km grid ref', () => {
    expect(checkGr('N34')).toEqual({
      precision: 10000,
      prefix: 'N',
      projection: 'ir'});
  })
  test('Check Irish 5 km grid ref', () => {
    expect(checkGr('B45SW')).toEqual({
      precision: 5000,
      prefix: 'B',
      projection: 'ir'});
  })

  test('Check Irish 2 km grid ref', () => {
    expect(checkGr('T00A')).toEqual({
      precision: 2000,
      prefix: 'T',
      projection: 'ir'});
  })

  test('Check Irish 1 km grid ref', () => {
    expect(checkGr('L9769')).toEqual({
      precision: 1000,
      prefix: 'L',
      projection: 'ir'});
  })

  test('Check Irish 6 fig grid ref SD34', () => {
    expect(checkGr('C897654')).toEqual({
      precision: 100,
      prefix: 'C',
      projection: 'ir'});
  })

  test('Check Irish 8 fig grid ref SD34', () => {
    expect(checkGr('E89734654')).toEqual({
      precision: 10,
      prefix: 'E',
      projection: 'ir'});
  })

  test('Check Irish 10 fig grid ref SD34', () => {
    expect(checkGr('Q8938767654')).toEqual({
      precision: 1,
      prefix: 'Q',
      projection: 'ir'});
  })
})

describe('Check return values of checkGr for Channel Island GRs', function () {

  test('Check Channel Island 100 km grid ref', () => {
    expect(checkGr('WV')).toEqual({
      precision: 100000,
      prefix: 'WV',
      projection: 'ci'});
  })

  test('Check Channel Island 10 km grid ref', () => {
    expect(checkGr('WA34')).toEqual({
      precision: 10000,
      prefix: 'WA',
      projection: 'ci'});
  })
  test('Check Channel Island 5 km grid ref', () => {
    expect(checkGr('WV45SW')).toEqual({
      precision: 5000,
      prefix: 'WV',
      projection: 'ci'});
  })

  test('Check Channel Island 2 km grid ref', () => {
    expect(checkGr('WA00A')).toEqual({
      precision: 2000,
      prefix: 'WA',
      projection: 'ci'});
  })

  test('Check Channel Island 1 km grid ref', () => {
    expect(checkGr('WV9769')).toEqual({
      precision: 1000,
      prefix: 'WV',
      projection: 'ci'});
  })

  test('Check Channel Island 6 fig grid ref SD34', () => {
    expect(checkGr('WA897654')).toEqual({
      precision: 100,
      prefix: 'WA',
      projection: 'ci'});
  })

  test('Check Channel Island 8 fig grid ref SD34', () => {
    expect(checkGr('WV89734654')).toEqual({
      precision: 10,
      prefix: 'WV',
      projection: 'ci'});
  })

  test('Check Channel Island 10 fig grid ref SD34', () => {
    expect(checkGr('WA8938767654')).toEqual({
      precision: 1,
      prefix: 'WA',
      projection: 'ci'});
  })
})


