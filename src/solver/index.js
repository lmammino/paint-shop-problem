const candidateSolutions = require('./candidateSolutions')
const prepareCustomerPreferences = require('./prepareCustomerPreferences')
const validateSolution = require('./validateSolution')

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
