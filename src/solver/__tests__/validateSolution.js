const validateSolution = require('../validateSolution')

test('It should validate a valid solution', done => {
  const candidateSequence = [
    { color: 1, finish: 'G' },
    { color: 1, finish: 'G' },
    { color: 2, finish: 'G' },
    { color: 3, finish: 'M' }
  ]

  const expectedSolution = 'G G M G'
  const solution = validateSolution(4, candidateSequence)
  expect(solution).toEqual(expectedSolution)

  done()
})

test('It should properly spot an invalid solution', done => {
  const candidateSequence = [
    { color: 1, finish: 'G' },
    { color: 1, finish: 'M', readOnly: true },
    { color: 2, finish: 'G' },
    { color: 3, finish: 'M' }
  ]

  const solution = validateSolution(3, candidateSequence)
  expect(solution).toBe(false)

  done()
})
