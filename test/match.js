import test from 'ava'

import { Ok, Err } from '../src/Result'
import match from '../src/match'
import { call } from 'redux-saga/effects'

class SpecialLibraryError extends Error {

  constructor (message) {
    super(message)
    this.message = message
    this.name = 'SpecialLibraryError'
  }

}

const okHandler = (value) => `${value} ${value}`
const errHandler = (err) => err
const specialErrHandler = (err) => `special error handling: ${err}`
const toHandlers = {
  Ok: okHandler,
  Err: errHandler,
  SpecialLibraryError: specialErrHandler
}

test('Ok matches the Ok handler', (t) => {
  const okArgs = ['some value']
  const okResult = new Ok(...okArgs)
  const matchGenerator = match(okResult).as(toHandlers)
  const value = matchGenerator.next().value

  t.is(value, 'some value some value')
})

test('Err matches the Err handler', (t) => {
  const errArgs = [new Error('uh oh')]
  const errResult = new Err(...errArgs)
  const matchGenerator = match(errResult).as(toHandlers)
  const value = matchGenerator.next().value

  t.is(value, errArgs[0])
})

test('SpecialLibraryError matches the SpecialLibraryError handler', (t) => {
  const errArgs = [new SpecialLibraryError('uh oh')]
  const errResult = new Err(...errArgs)
  const matchGenerator = match(errResult).as(toHandlers)
  const value = matchGenerator.next().value

  t.is(value, `special error handling: ${errArgs[0]}`)
})

test('Ok matches the Ok generator handler', function * (t) {
  const expel = [ 'this', 'is', 'getting', 'peculiar!' ]
  const identity = (v) => v
  function * okHandlerGenerator (ok) {
    yield call(identity, expel)
    return expel
  }
  function * errHandlerGenerator (err) {
    yield call(identity, err)
    return err
  }

  const okArgs = ['some value']
  const okResult = new Ok(...okArgs)
  const matchGenerator = match(okResult).as({
    Ok: okHandlerGenerator,
    Err: errHandlerGenerator
  })
  const handlerGenerator = matchGenerator.next().value
  const callInstruction = handlerGenerator.next().value

  t.truthy(callInstruction.CALL)
  t.is(callInstruction.CALL.fn, identity)
  t.deepEqual(callInstruction.CALL.args, [ expel ])

  const returnValue = handlerGenerator.next().value
  t.is(returnValue, expel)
})

test('Err matches the Err generator handler', function * (t) {
  const expel = [ 'this', 'is', 'getting', 'peculiar!' ]
  const identity = (v) => v
  function * okHandlerGenerator (ok) {
    yield call(identity, expel)
    return expel
  }
  function * errHandlerGenerator (err) {
    yield call(identity, err)
    return err
  }

  const errArgs = [new Error('uh oh')]
  const errResult = new Err(...errArgs)
  const matchGenerator = match(errResult).as({
    Ok: okHandlerGenerator,
    Err: errHandlerGenerator
  })
  const handlerGenerator = matchGenerator.next().value
  const callInstruction = handlerGenerator.next().value

  t.truthy(callInstruction.CALL)
  t.is(callInstruction.CALL.fn, identity)
  t.deepEqual(callInstruction.CALL.args, errArgs)

  const returnValue = handlerGenerator.next().value
  t.is(returnValue, errArgs[0])
})
