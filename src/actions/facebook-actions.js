export const SET_PARAM = 'SET_PARAM'
export const CREATE_LICENSE = 'CREATE_LICENSE'
export const GET_LICENSES = 'GET_LICENSES'
export const GET_LICENSES_SUCCESS = 'GET_LICENSES_SUCCESS'
export const MODIFY_LICENSE = 'MODIFY_LICENSE'
export const DELETE_LICENSE = 'DELETE_LICENSE'
export const SET_NAV = 'SET_NAV'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const SET_PRODUCT_PARAMS = 'SET_PRODUCT_PARAMS'
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS'

export const setParams = ( payload ) => ({
    type: SET_PARAM,
    payload
})

export const createLicense = (payload) => ({
    type:CREATE_LICENSE,
    payload
})

export const createProduct = (payload) => ({
    type:CREATE_PRODUCT,
    payload
})

export const getLicenses = ( payload ) =>({
    type:GET_LICENSES,
    payload
})

export const getProducts = ( ) =>({
    type:GET_PRODUCTS,
})

export const modifyLicense = ( payload ) =>({
    type:MODIFY_LICENSE,
    payload
})


export const deleteLicense = ( payload ) =>({
    type:DELETE_LICENSE,
    payload
})

export const setNav = ( payload ) =>({
    type: SET_NAV,
    payload
})

export const setProductParams = (payload) => ({
    type:SET_PRODUCT_PARAMS,
    payload
})