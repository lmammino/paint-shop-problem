// Verifies if the current solution is making every customer happy by checking
// that at least one of their preferences is satisfied by the current result
const isSatisfyingAllPreferences = (result, customerPreferences) => {
  return customerPreferences.every(preferences => {
    return preferences.some(selection => result[selection.color - 1] === selection.finish)
  })
}

const validateSolution = (numColors, candidate, customerPreferences) => {
  // colors is the working array, is created with numColors cells initialized to null
  const colors = Array.from({length: numColors}, i => null)

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

  // verifies that the current solution is satisfying all customers
  if (!isSatisfyingAllPreferences(result, customerPreferences)) {
    return false
  }

  return result.join(' ')
}

module.exports = validateSolution
