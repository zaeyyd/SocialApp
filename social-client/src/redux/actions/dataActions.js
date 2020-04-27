import { SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST, DELETE_POST } from '../types'
import axios from 'axios'

//get all posts
export const getPosts = () => dispatch => {
    dispatch({ type: LOADING_DATA })
    axios.get('/posts')
        .then(res => {
            dispatch({
                type: SET_POSTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_POSTS,
                payload: []
            })
        })
}

// Like
export const likePost = (postID) => dispatch => {
    axios.get(`/post/${postID}/like`)
        .then(res => {
            dispatch({
                type: LIKE_POST,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}


//UnLike
export const unlikePost = (postID) => dispatch => {
    axios.get(`/post/${postID}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_POST,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const deletePost = (postID) => (dispatch) => {
    axios.delete(`/post/${postID}`)
    .then(()=>{
        dispatch({ type: DELETE_POST, payload: postID})
    })
    .catch(err => console.log(err))
}