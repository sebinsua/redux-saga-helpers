import createAction from '@f/create-action'
import { put } from 'redux-saga/effects'

import generateDefaultCallName from './generateDefaultCallName'
import generateWrappedFunctionName from './generateWrappedFunctionName'
import createBooleanCallHandler from './createBooleanCallHandler'

function hasDefaultToString (fn) {
  return typeof fn === 'function' && fn.toString().indexOf('function') !== -1
}

export function toActionPutter (actionCreator) {
  function * actionPutter (value) {
    yield put(actionCreator(value))
  }
  const overrideWrapped = hasDefaultToString(actionCreator) ? false : `${actionCreator}`
  actionPutter.displayName = generateWrappedFunctionName(actionPutter, actionCreator, overrideWrapped)
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
