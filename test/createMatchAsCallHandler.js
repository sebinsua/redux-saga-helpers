import test from 'ava'

import createMatchAsCallHandler from '../src/createMatchAsCallHandler'
import { toActionPutter } from '../src/emitActions'
import { createAction } from 'redux-actions'
import { Ok, Err } from '../src/Result'
import match from '../src/match'

function expectName (name) {
  if (name) {
    return Promise.resolve(`Hello ${name}`)
  } else {
    return Promise.reject('Uh oh!')
  }
}

test('createMatchAsCallHandler() will yield a call instruction containing handleSuccess() if fn() did not error', (t) => {
  const name = 'Alex'
  const result = new Ok(`Hey ${name}`)

  const handleSuccess = toActionPutter(createAction('CALL_SUCCESS'))
  const handleError = toActionPutter(createAction('CALL_ERROR'))
  const toHandles = {
    Ok: handleSuccess,
    Err: handleError
  }
  const wrapFunctionWithMatchAsCallHandler = createMatchAsCallHandler(toHandles)
  const matchAsCallHandler = wrapFunctionWithMatchAsCallHandler(expectName)

  // This line can be problematic: https://github.com/tj/co/blob/master/index.js#L122
  // It can cause functions within the call instruction to get called early with bad arguments.
  // By default we wish to just return the effect without doing anything to it.
  const generator = matchAsCallHandler(name)
  let event = generator.next()
  event = generator.next(result)
  t.deepEqual(event.value, match(result).as(toHandles))
})

test('createMatchAsCallHandler() will yield a call instruction containing handleError() if fn() errored', (t) => {
  const result = new Err('Uh oh!')

  const handleSuccess = toActionPutter(createAction('CALL_SUCCESS'))
  const handleError = toActionPutter(createAction('CALL_ERROR'))
  const toHandles = {
    Ok: handleSuccess,
    Err: handleError
  }
  const wrapFunctionWithMatchAsCallHandler = createMatchAsCallHandler(toHandles)
  const matchAsCallHandler = wrapFunctionWithMatchAsCallHandler(expectName)

  const generator = matchAsCallHandler()
  let event = generator.next()
  event = generator.next(result)
  t.deepEqual(event.value, match(result).as(toHandles))
})
