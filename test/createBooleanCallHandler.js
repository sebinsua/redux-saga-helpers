import test from 'ava'

import createBooleanCallHandler from '../src/createBooleanCallHandler'
import { toActionPutter } from '../src/emitActions'
import { Ok, Err } from '../src/Result'
import { createAction } from 'redux-actions'
import { call } from 'redux-saga/effects'

function expectName (name) {
  if (name) {
    return Promise.resolve(`Hello ${name}`)
  } else {
    return Promise.reject('Uh oh!')
  }
}

test('booleanCallHandler() will yield a call instruction containing handleSuccess() if fn() did not error', (t) => {
  const name = 'Alex'
  const ok = `Hello ${name}`
  const result = new Ok(ok)

  const handleSuccess = toActionPutter(createAction('CALL_SUCCESS'))
  const handleError = toActionPutter(createAction('CALL_ERROR'))
  const wrapFunctionWithBooleanCallHandler = createBooleanCallHandler(handleSuccess, handleError)
  const booleanCallHandler = wrapFunctionWithBooleanCallHandler(expectName)

  // This line can be problematic: https://github.com/tj/co/blob/master/index.js#L122
  // It can cause functions within the call instruction to get called early with bad arguments.
  // By default we wish to just return the effect without doing anything to it.
  const generator = booleanCallHandler(name)
  generator.next()

  const event = generator.next(result)
  t.deepEqual(event.value, call(handleSuccess, ok))

  const returnValue = generator.next().value
  t.is(returnValue, result)
})

test('booleanCallHandler() will yield a call instruction containing handleError() if fn() errored', (t) => {
  const err = new Error('Uh oh!')
  const result = new Err(err)

  const handleSuccess = toActionPutter(createAction('CALL_SUCCESS'))
  const handleError = toActionPutter(createAction('CALL_ERROR'))
  const wrapFunctionWithBooleanCallHandler = createBooleanCallHandler(handleSuccess, handleError)
  const booleanCallHandler = wrapFunctionWithBooleanCallHandler(expectName)

  const generator = booleanCallHandler()
  generator.next()

  const event = generator.next(result)
  t.deepEqual(event.value, call(handleError, err))

  const returnValue = generator.next().value
  t.is(returnValue, result)
})
