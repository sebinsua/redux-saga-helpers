import test from 'ava'

import construct from '../src/construct'

class Basic {

  constructor (name, message) {
    this.name = name
    this.message = message
  }

}

test('create a constructor function from a class', (t) => {
  const constructBasic = construct(Basic)
  const basic = constructBasic('name', 'message')

  t.true(basic instanceof Basic)
  t.is(basic.name, 'name')
  t.is(basic.message, 'message')
})
