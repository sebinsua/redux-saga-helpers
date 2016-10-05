export function waterfall (fns = []) {
  function * flow () {
    let previousResult
    for (const fn of fns) {
      if (previousResult) {
        previousResult = yield fn(previousResult)
      } else {
        previousResult = yield fn()
      }
    }
    return previousResult
  }

  return flow
}

export default waterfall
