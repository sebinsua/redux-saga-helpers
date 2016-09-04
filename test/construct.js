import test from 'ava'

import construct from '../src/construct'

test('create a constructor function from a class', (t) => {
  class Basic {}

  const constructBasic = construct(Basic)

  t.true(constructBasic() instanceof Basic)
})
