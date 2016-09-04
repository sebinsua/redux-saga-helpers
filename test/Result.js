import test from 'ava'

import { Ok, Err } from '../src/Result'

test('Ok and Err should have the correct boolean isOk() and isErr()', (t) => {
  const okResult = new Ok('Bob')
  const errResult = new Err(new Error('Uh oh!'))

  t.is(okResult.isOk(), true)
  t.is(okResult.isErr(), false)

  t.is(errResult.isOk(), false)
  t.is(errResult.isErr(), true)
})

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
