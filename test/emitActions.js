import test from 'ava'

import emitActions, { toActionPutter, createEmitActions } from '../src/emitActions'
import { createAction } from 'redux-actions'
import { put, call } from 'redux-saga/effects'

function expectName (name) {
  if (name) {
    return Promise.resolve(`Hello ${name}`)
  } else {
    return Promise.reject('Uh oh!')
  }
}

test('toActionPutter() takes an action creator and creates a generator that uses this to put values', (t) => {
  const action = createAction('CALL_ME_MAYBE')
  const actionPutter = toActionPutter(action)

  const generator = actionPutter(5)
  const event = generator.next()
  t.deepEqual(event.value, put(action(5)))
})

test('createEmitActions() should take two actions and use these to wrap a fn() with booleanCallHandler()', (t) => {
  const name = 'Alex'
  const ok = `Hello ${name}`
  const err = null

  const successAction = createAction('CALL_SUCCESS')
  const errorAction = createAction('CALL_ERROR')
  const emitActions = createEmitActions(successAction, errorAction)

  const generator = emitActions(expectName)(name)
  generator.next()
  const event = generator.next([ ok, err ])
  t.is(event.value.CALL.fn.displayName, 'actionPutter(CALL_SUCCESS)')
  t.deepEqual(event.value.CALL.args, [ ok ])
})

test('emitActions() will yield a put instruction containing a success action if fn() did not error', (t) => {
  const name = 'Alex'
  const ok = `Hello ${name}`
  const err = null

  const generator = emitActions(expectName)(name)
  generator.next()
  const event = generator.next([ ok, err ])
  t.is(event.value.CALL.fn.displayName, 'actionPutter(EXPECT_NAME_SUCCESS)')
  t.deepEqual(event.value.CALL.args, [ ok ])
})

test('emitActions() will yield a put instruction containing an error action if fn() errored', (t) => {
  const ok = null
  const err = new Error('Uh oh!')

  const generator = emitActions(expectName)()
  generator.next()
  const event = generator.next([ ok, err ])
  t.is(event.value.CALL.fn.displayName, 'actionPutter(EXPECT_NAME_ERROR)')
  t.deepEqual(event.value.CALL.args, [ err ])
})
