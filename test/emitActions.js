import test from 'ava'

import emitActions, { toActionPutter, createEmitActions } from '../src/emitActions'
import { createAction } from 'redux-actions'
import { put } from 'redux-saga/effects'

test('toActionPutter() takes an action creator and creates a generator that uses this to put values', (t) => {
  const action = createAction('CALL_ME_MAYBE')
  const actionPutter = toActionPutter(action)

  const generator = actionPutter(5)
  const event = generator.next()
  t.deepEqual(event.value, put(action(5)))
})

// TODO: 3. Test.
test.skip('emitActions() will yield a put instruction containing a success action if fn() did not error', (t) => {
  // generator.next().value, etc...
})

test.skip('emitActions() will yield a put instruction containing an error action if fn() errored', (t) => {

})
