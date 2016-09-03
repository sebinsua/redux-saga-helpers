import { Ok, Err } from './Result'

export function toResult (fn) {
  return (...args) => {
    return fn(...args).then(construct(Ok), construct(Err))
  }
}
