import { all } from 'redux-saga/effects'
import lisenceFlow from './sagas/lisence-sagas'

function* saga () {
  yield all([
     ...lisenceFlow,
  ])
}

export default saga
