const { join } = require('path')
const fileParser = require('../fileParser')

test('It should parse a valid input file', done => {
  const expectedResult = {
    'numColors': 1,
    'customerPreferences': [
      [
        {
          'color': 1,
          'finish': 'G'
        }
      ],
      [
        {
          'color': 1,
          'finish': 'M'
        }
      ]
    ]
  }
  const output = fileParser(join(__dirname, '..', '..', 'examples', 'case2.txt'))
  expect(output).toEqual(expectedResult)
  done()
})
