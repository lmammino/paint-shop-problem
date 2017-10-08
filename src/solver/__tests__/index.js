const solver = require('..')

test('If it can find a valid solution it should return it straight away', done => {
  const customerPreferences = [
    [{ color: 1, finish: 'G' }, { color: 2, finish: 'G' }],
    [{ color: 3, finish: 'M' }]
  ]

  const expectedSolution = 'G G M'

  const solution = solver({ numColors: 3, customerPreferences })
  expect(solution).toEqual(expectedSolution)

  done()
})

test('If it cannot find a valid solution', done => {
  const customerPreferences = [
    [{ color: 3, finish: 'G' }],
    [{ color: 3, finish: 'M' }]
  ]

  const expectedSolution = 'No solution exists'

  const solution = solver({ numColors: 3, customerPreferences })
  expect(solution).toEqual(expectedSolution)

  done()
})
