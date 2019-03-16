import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { Route , } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import configureStore ,{ history } from './store'
import App from './App'

const store = configureStore()
const rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history ={history}>
      <div>
        <Route path='/' component={App} />
      </div>
    </ConnectedRouter>
  </Provider>,
  root
)
