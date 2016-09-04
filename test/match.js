import test from 'ava'

import { Ok, Err } from '../src/Result'
import match from '../src/match'

class SpecialLibraryError extends Error {

  constructor (message) {
    super(message)
    this.message = message;
    this.name = 'SpecialLibraryError'
  }

}

const okHandler = (value) => `${value} ${value}`
const errHandler = (err) => err
const specialErrHandler = (err) => 'special error handling'
const toHandlers = {
  Ok: okHandler,
  Err: errHandler,
  SpecialLibraryError: specialErrHandler
}

test('Ok matches the Ok handler', (t) => {
  const okArgs = ['some value']
  const okResult = new Ok(...okArgs)
  const callInstruction = match(okResult).as(toHandlers)

  t.truthy(callInstruction.CALL)
  t.is(callInstruction.CALL.fn, okHandler)
  t.deepEqual(callInstruction.CALL.args, okArgs)
})

test('Err matches the Err handler', (t) => {
  const errArgs = [new Error('uh oh')]
  const errResult = new Err(...errArgs)
  const callInstruction = match(errResult).as(toHandlers)

  t.truthy(callInstruction.CALL)
  t.is(callInstruction.CALL.fn, errHandler)
  t.deepEqual(callInstruction.CALL.args, errArgs)
})

test('SpecialLibraryError matches the SpecialLibraryError handler', (t) => {
  const errArgs = [new SpecialLibraryError('uh oh')]
  const errResult = new Err(...errArgs)
  const callInstruction = match(errResult).as(toHandlers)

  t.truthy(callInstruction.CALL)
  t.is(callInstruction.CALL.fn, specialErrHandler)
  t.deepEqual(callInstruction.CALL.args, errArgs)
})
