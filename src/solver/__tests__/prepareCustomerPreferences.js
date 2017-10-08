const prepareCustomerPreferences = require('../prepareCustomerPreferences')

test('It should prepare customer preferences by sorting them and adding read only flags', done => {
  const customerPreferences = [
    [{ color: 2, finish: 'M' }, { color: 1, finish: 'M' }, { color: 1, finish: 'G' }],
    [{ color: 2, finish: 'G' }]
  ]

  const expectedPreparedCustomerPreferences = [
    [{ color: 1, finish: 'G' }, { color: 1, finish: 'M' }, { color: 2, finish: 'M' }],
    [{ color: 2, finish: 'G', readOnly: true }]
  ]

  const preparedCustomerPreferences = prepareCustomerPreferences(customerPreferences)
  expect(preparedCustomerPreferences).toEqual(expectedPreparedCustomerPreferences)
  done()
})
