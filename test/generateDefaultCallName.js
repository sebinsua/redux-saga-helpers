import test from 'ava'

import generateDefaultCallName from '../src/generateDefaultCallName'

test('create a CALL_NAME when a function is passed in', (t) => {
  function fetchProducts () {}

  const callName = generateDefaultCallName(fetchProducts)

  t.is(callName, 'FETCH_PRODUCTS')
})
