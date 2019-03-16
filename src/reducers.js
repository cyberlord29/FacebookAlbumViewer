import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import lisenceManager from './reducers/lisenceManager'

export default combineReducers({
    facebook: lisenceManager
  })