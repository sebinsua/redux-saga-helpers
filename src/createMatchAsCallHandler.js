import { call } from 'redux-saga/effects'

import generateWrappedFunctionName from './generateWrappedFunctionName'
import toResult from './toResult'
import match from './match'

export function createMatchAsCallHandler (toHandles = {}) {
  function wrapFunctionWithMatchAsCallHandler (fn) {
    function* matchAsCallHandler (...args) {
      const result = yield call(toResult(fn), ...args)
      yield match(result).as(toHandles)
    }
    matchAsCallHandler.displayName = generateWrappedFunctionName(matchAsCallHandler, fn)
    return matchAsCallHandler
  }
  return wrapFunctionWithMatchAsCallHandler
}

export default createMatchAsCallHandler
