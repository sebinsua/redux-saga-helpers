# redux-saga-helpers
> Error-handling for `redux-saga`

This library provides a selection of small utilities to better handle sagas.

## Why?

- Following [the error-handling pattern recommended within the `redux-saga` docs]((https://yelouafi.github.io/redux-saga/docs/basics/ErrorHandling.html)) can lead to [code that silently swallows errors](https://github.com/yelouafi/redux-saga/issues/521) and that gives cryptic error messages. This is because [`redux-saga#put` effects cause `dispatch`es that might error](https://twitter.com/dan_abramov/status/770914221638942720) causing [corruption of React's internal state](https://twitter.com/dan_abramov/status/770918163965997056).
- Additionally JavaScript's try-catch syntax does not provide an easy way to catch specific errors.

## Install

```sh
npm install --save redux-saga-helpers
```

## Examples

### `toResult`

```js
import { call, put } from 'redux-saga/effects'
import { toResult } from 'redux-saga-helpers'
import { fetchProductSuccess, fetchProductError } from './actions'

function fetchProduct (id) {
  return fetch(`/products/${id}`)
}

export function * loadProduct () {
  const [ product, error ] = yield call(toResult(fetchProduct), 1)
  if (!error) {
    yield put(fetchProductSuccess(product))
  } else {
    yield put(fetchProductError(error))
  }
}
```

### `emitActions`

```js
import { createAction } from 'redux-actions'
import { call } from 'redux-saga/effects'
import { emitActions } from 'redux-saga-helpers'

function fetchProduct (id) {
  return fetch(`/products/${id}`)
}

export function * loadProduct () {
  // `emitActions(fetchProduct)` automatically generates a
  // `FETCH_PRODUCT_SUCCESS` or `FETCH_PRODUCT_ERROR` action.
  yield call(emitActions(fetchProduct), 1)
}
```

### `createEmitActions`

```js
import { createAction } from 'redux-actions'
import { call } from 'redux-saga/effects'
import { createEmitActions } from 'redux-saga-helpers'

function fetchProduct (id) {
  return fetch(`/products/${id}`)
}

export function * loadProduct () {
  const successAction = createAction('PRODUCT_REQUEST_RECEIVED')
  const errorAction = createAction('PRODUCT_REQUEST_FAILED')
  const emitProductActions = createEmitActions(successAction, errorAction)
  yield call(emitProductActions(fetchProduct), 1)
}
```

### `createBooleanCallHandler`

```js
import { createAction } from 'redux-actions'
import { call } from 'redux-saga/effects'
import { createBooleanCallHandler, toActionPutter } from 'redux-saga-helpers'

function fetchProduct (id) {
  return fetch(`/products/${id}`)
}

export function * loadProduct () {
  const successHandler = toActionPutter(createAction('PRODUCT_REQUEST_RECEIVED'))
  const errorHandler = toActionPutter(createAction('PRODUCT_REQUEST_FAILED'))
  const booleanCallHandler = createBooleanCallHandler(successHandler, errorHandler)
  yield call(booleanCallHandler(fetchProduct), 1)
}
```

### `createMatchAsCallHandler`

```js
import { call } from 'redux-saga/effects'
import { createMatchAsCallHandler } from 'redux-saga-helpers'

function fetchProduct (id) {
  return fetch(`/products/${id}`)
}

export function * loadProduct () {
  const okHandler = (value) => `${value} ${value}`
  const errHandler = (err) => err
  const authErrorHandler = (err) => `handle authentication errors: ${err}`
  const matchAsCallHandler = createMatchAsCallHandler({
    Ok: okHandler,
    Err: errHandler,
    AuthError: authErrorHandler
  })
  yield call(matchAsCallHandler(fetchProduct), 1)
}
```

### `match`

```js
import { call } from 'redux-saga/effects'
import { toResult, match } from 'redux-saga-helpers'

function fetchProduct (id) {
  return fetch(`/products/${id}`)
}

export function * testMatch () {
  const log = console.log.bind(console)
  const fetchProductAsResult = toResult(fetchProduct)
  const result = yield fetchProductAsResult(1)
  return yield match(result).as({
    Ok: (value) => call(log, `${value} ${value}`),
    Err: (err) => call(log, err),
  })
}
```
