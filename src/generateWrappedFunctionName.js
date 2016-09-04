import getFunctionName from 'fn-name'

export default function generateWrappedFunctionName (functionWrapper, functionWrapped) {
  return `${getFunctionName(functionWrapper)}(${getFunctionName(functionWrapped)})`
}
