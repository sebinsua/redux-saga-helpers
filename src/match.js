import { call } from 'redux-saga'

import { Ok, Err } from './Result'

export default function match (result) {
  return {
    * as (toHandles = {}) {
      if (!toHandles[Ok] || !toHandles[Err]) {
        throw new Error('match-as requires Ok and Err to be defined')
      }

      let handler, value
      if (result.isOk()) {
        value = result.ok
        handler = toHandles[Ok]
      } else {
        value = result.err
        const defaultErrorHandler = toHandles[Err]
        handler = defaultErrorHandler
        for (let handlerKey in toHandles) {
          if (handlerKey && handlerKey.err instanceof result.err) {
            handler = toHandles[handlerKey]
          }
        }
      }
      yield call(handler, value)
    }
  }
}
