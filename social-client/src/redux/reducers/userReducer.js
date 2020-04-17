import { SET_USER, CLEAR_ERRORS, LOADING_UI, SET_ERRORS, SET_AUTHED, LOADING_USER, SET_UNAUTHED } from '../types'

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_AUTHED:
            return {
                ...state,
                authenticated: true
            }
        case SET_UNAUTHED:
            return initialState
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            }
        case LOADING_USER: 
            return{
                ...state,
                loading: true
            }
        default:
            return state
    }
}