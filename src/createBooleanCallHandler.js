import getFunctionName from 'fn-name'
import { call } from 'redux-saga'

import toResult from './toResult'

export function createBooleanCallHandler (handleSuccess, handleError) {
  function wrapFunctionWithBooleanCallHandler (fn) {
    function* booleanCallHandler (...args) {
      const [ ok, error ] = yield call(toResult(fn), ...args)
      if (!error) {
        yield call(handleSuccess, ok)
      } else {
        yield call(handleError, error)
      }
    }
    booleanCallHandler.displayName = `${getFunctionName(booleanCallHandler)}(${getFunctionName(fn)})`
    return booleanCallHandler
  }
  wrapFunctionWithBooleanCallHandler.displayName = `${getFunctionName(wrapFunctionWithBooleanCallHandler)}(${getFunctionName(fn)})`
  return wrapFunctionWithBooleanCallHandler
}

export default createBooleanCallHandler
