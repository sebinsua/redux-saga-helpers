export default function match (result) {
  return {
    // NOTE: The keys of toHandles are strings; if we need to match a specific
    //       error name then the error must have a string `name` property.
    * as (toHandles = {}) {
      if (!toHandles.Ok || !toHandles.Err) {
        throw new Error('match-as requires Ok and Err to be defined')
      }

      let handler, value
      if (result.isOk()) {
        handler = toHandles.Ok
        value = result.ok
      } else {
        const defaultErrorHandler = toHandles.Err
        handler = defaultErrorHandler
        for (let handlerKey in toHandles) {
          if (handlerKey === 'Ok' || handlerKey === 'Err') {
            continue
          }
          const errorToLookFor = handlerKey
          const currentErrorName = result.err.name
          if (currentErrorName === errorToLookFor) {
            handler = toHandles[handlerKey]
          }
        }
        value = result.err
      }
      return yield handler(value)
    }
  }
}
