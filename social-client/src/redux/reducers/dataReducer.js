import { SET_POSTS, SET_POST, LOADING_DATA, LIKE_POST, UNLIKE_POST, DELETE_POST, MAKE_POST } from '../types'

const initialState = {
    posts: [],
    post: {},
    loading: false
}

export default function(state = initialState, action){
    let index
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_POSTS:
            return{
                ...state,
                posts: action.payload,
                loading: false
            }
        case SET_POST:
            return{
                ...state,
                post: action.payload
            }
        case LIKE_POST:
        case UNLIKE_POST:
            index = state.posts.findIndex((post)=> post.postID === action.payload.postID)
            state.posts[index] = action.payload
            if(state.post.postID === action.payload.postID){
                state.post = action.payload 
            }
            return{
                ...state
            }
        case DELETE_POST:
            index = state.posts.findIndex(post => post.postID === action.payload)
            state.posts.splice(index, 1)
            
            return {
                ...state
            }
        case MAKE_POST:
             return{
                 ...state,
                 posts: [
                     action.payload,
                     ...state.posts
                 ]
             }
        default:
            return state
    }
}