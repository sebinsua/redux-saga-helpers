export class Result {

  ok = null
  err = null

  static Ok = Ok
  static Err = Err

  constructor(value, error) {
    this.ok = value
    this.err = error
  }

  *[Symbol.iterator]() {
    yield [ ok, err ]
  }

  isOk() {
    return !this.err
  }

  isErr() {
    return !!this.err
  }

}

export class Ok extends Result {

  constructor(value) {
    super(value, null)
  }

}

export class Err extends Result {

  constructor(error) {
    super(null, error)
  }

}
