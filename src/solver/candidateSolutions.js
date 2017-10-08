/**
 * Helper function that computes a specific combination of customer preferences
 * given an index. The math behind it uses a biejective association between non-negative
 * integers and the ordered list of possible sequences. The idea is similar to converting
 * integers from base 10 to a base with a variable number of elements in every position
 */
const getCandidateSolution = (i, customerPreferences) => {
  const lengths = customerPreferences.map(l => l.length)
  let x = i
  // calculates indexes for every position (preference)
  const candidateSolutionIndexes = lengths.reverse().map(length => {
    const index = x % length
    x = Math.floor(x / length)
    return index
  }).reverse()
  // uses the selected indexes to reconstruct an array of preferences (a possible solution)
  const candidateSolution = candidateSolutionIndexes.map((index, line) => customerPreferences[line][index])

  return candidateSolution
}

/**
 * Factory method to generate an iterator over all the possible solutions for a given
 * set of customer preferences
 */
const candidateSolutions = (customerPreferences) => function * getNext () {
  // total number of possible combinations is obtained by multiplying the number of
  // element in every set of preferences (1 set per customer)
  const combinations = customerPreferences.reduce((acc, curr) => acc * curr.length, 1)
  for (let i = 0; i < combinations; i++) {
    yield getCandidateSolution(i, customerPreferences)
  }

  return null
}

module.exports = candidateSolutions
