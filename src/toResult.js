import generateWrappedFunctionName from './generateWrappedFunctionName'
import construct from './construct'
import { Ok, Err } from './Result'

const toOk = construct(Ok)
const toErr = construct(Err)

export function toResult (fn) {
  function * wrapFunctionWithToResult (...args) {
    try {
      const out = yield fn(...args)
      if (out && out.then) {
        return out.then(toOk, toErr)
      } else {
        return toOk(out)
      }
    } catch (err) {
      return toErr(err)
    }
  }
  wrapFunctionWithToResult.displayName = generateWrappedFunctionName(wrapFunctionWithToResult, fn)
  return wrapFunctionWithToResult
}

export default toResult
