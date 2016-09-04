import getFunctionName from 'fn-name'

export default function generateWrappedFunctionName (functionWrapper, functionWrapped, overrideWrapped = false) {
  const wrappedName = overrideWrapped || getFunctionName(functionWrapped)
  return `${getFunctionName(functionWrapper)}(${wrappedName})`
}
