import { call } from 'redux-saga/effects'

import generateWrappedFunctionName from './generateWrappedFunctionName'
import toResult from './toResult'

export function createBooleanCallHandler (handleSuccess, handleError) {
  function wrapFunctionWithBooleanCallHandler (fn) {
    function * booleanCallHandler (...args) {
      const [ ok, error ] = yield call(toResult(fn), ...args)
      if (!error) {
        yield call(handleSuccess, ok)
      } else {
        yield call(handleError, error)
      }
    }
    booleanCallHandler.displayName = generateWrappedFunctionName(booleanCallHandler, fn)
    return booleanCallHandler
  }
  return wrapFunctionWithBooleanCallHandler
}

export default createBooleanCallHandler
