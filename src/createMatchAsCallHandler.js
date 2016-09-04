import getFunctionName from 'fn-name'
import { call } from 'redux-saga'

import toResult from './toResult'
import match from './match'

export function createMatchAsCallHandler (toHandles = {}) {
  function wrapFunctionWithMatchAsCallHandler (fn) {
    function* matchAsCallHandler (...args) {
      const result = yield call(toResult(fn), ...args)
      yield match(result).as(toHandles)
    }
    matchAsCallHandler.displayName = `${getFunctionName(matchAsCallHandler)}(${getFunctionName(fn)})`
    return matchAsCallHandler
  }
  wrapFunctionWithMatchAsCallHandler.displayName = `${getFunctionName(wrapFunctionWithMatchAsCallHandler)}(${getFunctionName(fn)})`
  return wrapFunctionWithMatchAsCallHandler
}

export default createMatchAsCallHandler
