import generateWrappedFunctionName from './generateWrappedFunctionName'
import construct from './construct'
import { Ok, Err } from './Result'

const toOk = construct(Ok)
const toErr = construct(Err)

export function toResult (fn) {
  function * wrapFunctionWithToResult (...args) {
    try {
      const out = yield fn(...args)
      if (!out.then) {
        return toOk(out)
      } else {
        return out.then(toOk, toErr)
      }
    } catch (err) {
      return toErr(err)
    }
  }
  wrapFunctionWithToResult.displayName = generateWrappedFunctionName(wrapFunctionWithToResult, fn)
  return wrapFunctionWithToResult
}

export default toResult
