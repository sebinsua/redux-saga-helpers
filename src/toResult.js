import generateWrappedFunctionName from './generateWrappedFunctionName'
import construct from './construct'
import { Ok, Err } from './Result'

export default function toResult (fn) {
  function wrapFunctionWithToResult (...args) {
    return fn(...args).then(construct(Ok), construct(Err))
  }
  wrapFunctionWithToResult.displayName = generateWrappedFunctionName(wrapFunctionWithToResult, fn)
  return wrapFunctionWithToResult
}
