const getCandidateSolution = (i, customerPreferences) => {
  const lengths = customerPreferences.map(l => l.length)
  let x = i
  const candidateSolutionIndexes = lengths.reverse().map(length => {
    const index = x % length
    x = Math.floor(x / length)
    return index
  }).reverse()
  const candidateSolution = candidateSolutionIndexes.map((index, line) => customerPreferences[line][index])

  return candidateSolution
}

const candidateSolutions = (customerPreferences) => function* getNext() {
  const combinations = customerPreferences.reduce((acc, curr) => acc * curr.length, 1)
  for (let i = 0; i < combinations; i++) {
    yield getCandidateSolution(i, customerPreferences)
  }

  return null
}

const sortColor = (a, b) => {
  // G is always smaller than M
  if (a.finish === 'G' && b.finish === 'M' ) {
    return -1
  }

  // M is always bigger than G
  if (a.finish === 'M' && b.finish === 'G') {
    return 1
  }

  // if same finish, sort by color ascendent
  return a.color - b.color;
}

const prepareCustomerPreferences = (customerPreferences) =>
  customerPreferences
    // sort preferences by finish and color
    .map(l => l.sort(sortColor))
    // marks preferences with a single option as readOnly
    .map(l => {
      if (l.length === 1) {
        l[0].readOnly = true
      }

      return l
    })

const validateSolution = (numColors, candidate) => {
  // colors is the working array, is created with numColors cells initialized to null
  const colors = Array.from({length:numColors}, i => null)

  const found = candidate.every(preference => {

    // if trying to override a readOnly color (or using a readOnly color to override)
    // the solution is not valid
    if (
      colors[preference.color - 1] &&
      (colors[preference.color - 1].readOnly || preference.readOnly) &&
      colors[preference.color - 1].finish !== preference.finish
    ) {
      return false // stop iteration
    }

    // overrides the current cell in colors, using Object.assign preserves possible
    // readOnly tags

    colors[preference.color - 1] = Object.assign({}, colors[preference.color - 1], preference)
    return true // move to the next element
  })

  if (!found) {
    return false
  }

  const result = colors
    // fill missing colors with 'G' finish
    .map((c, i) => {
      if (c) {
        return c
      }

      return ({
        color: i + 1,
        finish: 'G'
      })
    })
    // flattens the colors into a string of finish options by index
    .map(c => c.finish)
    .join('')

  return result
}

const solver = ({ numColors, customerPreferences }) => {
  const p = prepareCustomerPreferences(customerPreferences)
  const candidates = candidateSolutions(p)

  for (let candidate of candidates()) {
    const solution = validateSolution(numColors, candidate)
    if (solution) {
      return solution
    }
  }

  return 'No solution exists'
}

module.exports = solver
