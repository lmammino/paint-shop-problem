const sortColor = require('../sortColor')

test('colors in Matte are always bigger than colors in Gloss', (done) => {
  expect(sortColor({finish: 'M'}, {finish: 'G'})).toBe(1)
  done()
})

test('colors in Gloss are always smaller than colors in Matte', (done) => {
  expect(sortColor({finish: 'G'}, {finish: 'M'})).toBe(-1)
  done()
})

test('colors with the same finish are ordered by index color', (done) => {
  expect(sortColor({finish: 'G', color: 2}, {finish: 'G', color: 1})).toBe(1)
  done()
})
