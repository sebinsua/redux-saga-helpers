import test from 'ava'

import generateWrappedFunctionName from '../src/generateWrappedFunctionName'

test('create a function name when inner() is wrapped by outer()', (t) => {
  function outer () {}
  function inner () {}

  const displayName = generateWrappedFunctionName(outer, inner)

  t.is(displayName, 'outer(inner)')
})
