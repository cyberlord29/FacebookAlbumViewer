import {
    SET_PARAM, 
    GET_LICENSES_SUCCESS,
    SET_NAV,
    GET_PRODUCTS_SUCCESS,
    SET_PRODUCT_PARAMS
} from '../actions/facebook-actions'

const initialState = {
    auth:{},
    status:'',
    albums:[],
    page:'albums',
    albumPhotos:[],
    showViewer:false,
}

const lisenceManager = (state = initialState, action) => {
    switch(action.type){
        case SET_NAV:
        return {
            ...state,
            setNav: action.payload.value
        }
        case SET_PARAM:
        return {
            ...state,
            [action.payload.id]: action.payload.value
            }
        default:
        return state
    }
}

export default lisenceManager
