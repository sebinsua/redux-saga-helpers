import { call } from 'redux-saga/effects'

import generateWrappedFunctionName from './generateWrappedFunctionName'
import toResult from './toResult'

export function createBooleanCallHandler (handleSuccess, handleError) {
  function wrapFunctionWithBooleanCallHandler (fn) {
    function * booleanCallHandler (...args) {
      const result = yield call(toResult(fn), ...args)
      if (result.isOk()) {
        yield call(handleSuccess, result.ok)
      } else {
        yield call(handleError, result.err)
      }
      return result
    }
    booleanCallHandler.displayName = generateWrappedFunctionName(booleanCallHandler, fn)
    return booleanCallHandler
  }
  return wrapFunctionWithBooleanCallHandler
}

export default createBooleanCallHandler
