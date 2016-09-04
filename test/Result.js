import test from 'ava'

import { Ok, Err } from '../src/Result'

test('destructure ok from Result', (t) => {
  const okResult = new Ok('Bob')

  const [ ok, err ] = okResult
  t.is(ok, 'Bob')
  t.is(err, null)
})

test('destructure err from Result', (t) => {
  const expectedErr = new Error('Uh oh!')
  const errResult = new Err(expectedErr)

  const [ ok, err ] = errResult
  t.is(ok, null)
  t.is(err, expectedErr)
})
