const candidateSolutions = require('../candidateSolutions')

test('It should generate an iterable set of candidate solutions out from a given set of preferences', done => {
  const preferences = [
    ['A', 'B'],
    ['C'],
    ['D', 'E']
  ]

  const expectedResult = [
    [ 'A', 'C', 'D' ],
    [ 'A', 'C', 'E' ],
    [ 'B', 'C', 'D' ],
    [ 'B', 'C', 'E' ]
  ]

  const solutions = candidateSolutions(preferences)

  const solutionsArray = []
  for (const s of solutions()) {
    solutionsArray.push(s)
  }

  expect(solutionsArray).toEqual(expectedResult)

  done()
})
