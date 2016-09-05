import { call } from 'redux-saga/effects'

import generateWrappedFunctionName from './generateWrappedFunctionName'
import toResult from './toResult'
import match from './match'

function createHandlerCallGenerator (handler) {
  function * handlerCallGenerator (value) {
    return yield call(handler, value)
  }
  handlerCallGenerator.displayName = generateWrappedFunctionName(handlerCallGenerator, handler)
  return handlerCallGenerator
}

function callifyHandles (toHandles) {
  const callifiedHandles = {}
  for (const handleKey in toHandles) {
    callifiedHandles[handleKey] = createHandlerCallGenerator(toHandles[handleKey])
  }
  return callifiedHandles
}

export function createMatchAsCallHandler (toHandles = {}) {
  const callifiedHandles = callifyHandles(toHandles)
  function wrapFunctionWithMatchAsCallHandler (fn) {
    function * matchAsCallHandler (...args) {
      const result = yield call(toResult(fn), ...args)
      yield match(result).as(callifiedHandles)
      return result
    }
    matchAsCallHandler.displayName = generateWrappedFunctionName(matchAsCallHandler, fn)
    return matchAsCallHandler
  }
  return wrapFunctionWithMatchAsCallHandler
}

export default createMatchAsCallHandler
