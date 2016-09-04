import test from 'ava'

import toResult from '../src/toResult'
import { Ok, Err } from '../src/Result'

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

test('destructure ok from Result', function * (t) {
  const fnToResult = toResult(expectName)

  const [ ok, err ] = yield fnToResult('Bob')
  t.is(ok, 'Hello Bob')
  t.is(err, null)
})

test('destructure err from Result', function * (t) {
  const fnToResult = toResult(expectName)

  const [ ok, err ] = yield fnToResult()
  t.is(ok, null)
  t.is(err, 'Uh oh!')
})
