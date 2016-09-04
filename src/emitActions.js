import { createAction } from 'redux-actions'
import { put } from 'redux-saga/effects'

import generateDefaultCallName from './generateDefaultCallName'
import generateWrappedFunctionName from './generateWrappedFunctionName'
import createBooleanCallHandler from './createBooleanCallHandler'

export function toActionPutter (actionCreator) {
  function * actionPutter (value) {
    yield put(actionCreator(value))
  }
  actionPutter.displayName = generateWrappedFunctionName(actionPutter, actionCreator, `${actionCreator}`)
  return actionPutter
}

export function createEmitActions (successAction, errorAction) {
  function emitActions (fn) {
    successAction = successAction || createAction(`${generateDefaultCallName(fn)}_SUCCESS`)
    errorAction = errorAction || createAction(`${generateDefaultCallName(fn)}_ERROR`)
    const booleanCallHandler = createBooleanCallHandler(toActionPutter(successAction), toActionPutter(errorAction))
    return booleanCallHandler(fn)
  }
  return emitActions
}

export const emitActions = createEmitActions(/* default fallback when we know fn */)

export default emitActions
