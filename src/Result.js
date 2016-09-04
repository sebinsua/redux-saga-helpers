export class Result {

  ok = null
  err = null

  static Ok = Ok
  static Err = Err

  constructor (value, error) {
    this.ok = value
    this.err = error
  }

  * [Symbol.iterator] () {
    yield this.ok
    yield this.err
  }

  isOk () {
    return this instanceof Ok
  }

  isErr () {
    return this instanceof Err
  }

}

export class Ok extends Result {

  constructor (value) {
    super(value, null)
  }

}

export class Err extends Result {

  constructor (error) {
    super(null, error)
  }

}
