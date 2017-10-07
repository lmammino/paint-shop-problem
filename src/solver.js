const getCandidateSolution = (i, customerPreferences) => {
  
}

function* candidateSolutions(customerPreferences) {
  const combinations = customerPreferences.reduce((acc, curr) => acc * curr.length, 1)
  for (let i = 0: i < combinations; i++) {

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

const solver = ({ numColors, customerPreferences }) => {
  const p = prepareCustomerPreferences(customerPreferences)



  return p
}

module.exports = solver
