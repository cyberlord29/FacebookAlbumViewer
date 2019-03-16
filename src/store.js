import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducers from './reducers'
import sagas from './sagas'

import { routerMiddleware } from 'react-router-redux'

import createHistory from 'history/createBrowserHistory'
export const history = createHistory()

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  let middleware = applyMiddleware(
    sagaMiddleware,
    routerMiddleware(history),
    // reduxActionMiddleware
  )

  if (process.env.NODE_ENV !== 'production') {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension())
    }
  }

  const store = createStore(reducers, middleware)
  sagaMiddleware.run(sagas)
  return store
}

export default configureStore
