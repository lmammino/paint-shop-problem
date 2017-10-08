const validateSolution = (numColors, candidate) => {
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
    .join(' ')

  return result
}

module.exports = validateSolution
