import { takeLatest, put, fork } from 'redux-saga/effects'
import {
    CREATE_LICENSE,
    GET_LICENSES,
    GET_LICENSES_SUCCESS,
    DELETE_LICENSE,
    MODIFY_LICENSE,
    GET_PRODUCTS,
    CREATE_PRODUCT,
    GET_PRODUCTS_SUCCESS
} from '../actions/facebook-actions'

import axios from 'axios'

const url = "http://localhost:5000"
// http://18.130.108.238

function * getLatestUsersFlow() {
    yield takeLatest(CREATE_LICENSE, createLicense)
}

function * getLicensesFlow() {
    yield takeLatest(GET_LICENSES, getLicenses)
}

function * getProductsFlow() {
    yield takeLatest(GET_PRODUCTS, getProducts)
}

function * createProductFlow() {
    yield takeLatest(CREATE_PRODUCT, createProduct)
}

function * modifyLicensesFlow() {
    yield takeLatest(MODIFY_LICENSE, modifyLicense)
}

function * deleteLicensesFlow() {
    yield takeLatest(DELETE_LICENSE, deleteLicense)
}

function * createLicense( { payload } ) {
    const response = yield axios.post(`${url}/licenses`,payload)
    if (response && response.data) {
        console.log(response.data)
        yield put({
            type: GET_LICENSES,
            data: response.data
          })
    }
}

function * createProduct( { payload } ) {
    const response = yield axios.post(`${url}/products`,payload)
    if (response && response.data) {
        console.log(response.data)
        yield put({
            type: GET_PRODUCTS,
            data: response.data
          })
    }
}


function * deleteLicense( { payload } ) {
    const response = yield axios.delete(`${url}/licenses`,{data:payload})
    if (response && response.data) {
        console.log(response.data)
        yield put({
            type: GET_LICENSES,
            data: response.data

          })
    }
}

function * modifyLicense( { payload } ) {
    console.log(payload)
    const response = yield axios.patch(`${url}/licenses`,payload)
    if (response && response.data) {
        console.log(response.data)
        yield put({
            type: GET_LICENSES,
            data: response.data
          })
    }
}

function * getLicenses(){
    const response = yield axios.get(`${url}/licenses`)
    if(response && response.data){
        yield put({
            type:GET_LICENSES_SUCCESS,
            data: response.data
        })
    }
}

function * getProducts(){
    const response = yield axios.get(`${url}/products`)
    if(response && response.data){
        yield put({
            type:GET_PRODUCTS_SUCCESS,
            data: response.data
        })
    }
}


export default [
    fork(getLatestUsersFlow),
    fork(getLicensesFlow),
    fork(modifyLicensesFlow),
    fork(deleteLicensesFlow),
    fork(getProductsFlow),
    fork(createProductFlow)
]
