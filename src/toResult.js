import construct from './construct'
import { Ok, Err } from './Result'

export default function toResult (fn) {
  return (...args) => {
    return fn(...args).then(construct(Ok), construct(Err))
  }
}
