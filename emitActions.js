import getFunctionName from 'fn-name'
import snakeCase from 'snake-case'
import { put } from 'redux-saga'

import createBooleanCallHandler from './createBooleanCallHandler'

function generateDefaultCallName (fn) {
  return snakeCase(getFunctionName(fn)).toUpperCase() || 'CALL'
}

export function toActionPutter (actionCreator) {
  function* actionPutter (value) {
    yield put(actionCreator(value))
  }
  actionPutter.displayName = `${getFunctionName(actionPutter)}(${getFunctionName(actionCreator)})`
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

export const emitActions = createEmitActions()

export default emitActions
