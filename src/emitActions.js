import { createAction } from 'redux-actions'
import { put } from 'redux-saga'

import generateDefaultCallName from './generateDefaultCallName'
import generateWrappedFunctionName from './generateWrappedFunctionName'
import createBooleanCallHandler from './createBooleanCallHandler'

export function toActionPutter (actionCreator) {
  function* actionPutter (value) {
    yield put(actionCreator(value))
  }
  actionPutter.displayName = generateWrappedFunctionName(actionPutter, actionCreator)
  return actionPutter
}

export function createEmitActions (successAction, errorAction) {
  return function emitActions (fn) {
    successAction = successAction || createAction(`${generateDefaultCallName(fn)}_SUCCESS`)
    errorAction = errorAction || createAction(`${generateDefaultCallName(fn)}_ERROR`)
    const callHandler = createBooleanCallHandler(toActionPutter(successAction), toActionPutter(errorAction))
    return callHandler(fn)
  }
}

export const emitActions = createEmitActions(/* default fallback when we know fn */)

export default emitActions
