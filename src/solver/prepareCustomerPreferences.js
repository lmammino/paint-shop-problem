const sortColor = require('./sortColor')

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

module.exports = prepareCustomerPreferences
