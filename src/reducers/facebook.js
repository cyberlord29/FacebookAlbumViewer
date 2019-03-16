import {
    SET_PARAM, 
    SET_NAV,

} from '../actions/facebook-actions'

const initialState = {
    auth:{},
    status:'',
    albums:[],
    page:'albums',
    albumPhotos:[],
    showViewer:false,
}

const facebook = (state = initialState, action) => {
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

export default facebook
