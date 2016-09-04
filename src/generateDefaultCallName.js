import getFunctionName from 'fn-name'
import snakeCase from 'snake-case'

export default function generateDefaultCallName (fn) {
  return snakeCase(getFunctionName(fn)).toUpperCase() || 'CALL'
}
