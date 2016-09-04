import test from 'ava'

import toResult from '../src/toResult'

function expectName (name) {
  if (name) {
    return Promise.resolve(`Hello ${name}`)
  } else {
    return Promise.reject('Uh oh!')
  }
}

test('when given a function should return a function that will return a Result', function * (t) {
  const fnToResult = toResult(expectName)

  const result = yield fnToResult('Bob')
  t.is(result.ok, 'Hello Bob')
  t.is(result.err, null)
})
