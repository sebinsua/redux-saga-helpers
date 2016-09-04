import { createAction } from 'redux-actions'

import { createEmitActions } from '.'

function fetchProduct (id) {
  return Api.fetch(`/products/${id}`)
}

function* loadProduct () {
  const successAction = createAction('PRODUCT_REQUEST_RECEIVED')
  const errorAction = createAction('PRODUCT_REQUEST_FAILED')
  const emitProductActions = createEmitActions(successAction, errorAction)

  yield call(emitProductActions(fetchProduct), 1)
}
