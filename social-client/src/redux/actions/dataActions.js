import { SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST, DELETE_POST, SET_ERRORS, CLEAR_ERRORS, MAKE_POST, LOADING_UI, SET_POST, STOP_LOADING_UI, SUBMIT_COMMENT } from '../types'
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

//COMMENT SUBMIT
export const submitComment = (postID, commentData) => (dispatch) => {
    axios.post(`/post/${postID}/comment`, commentData)
    .then(res => {
        dispatch({
            type: SUBMIT_COMMENT,
            payload: res.data
        })
        dispatch(clearErrors())
})
.catch(err => {
    dispatch({
        type: SET_ERRORS,
        payload: err.response.data
    })
})
}
export const deletePost = (postID) => (dispatch) => {
    axios.delete(`/post/${postID}`)
    .then(()=>{
        dispatch({ type: DELETE_POST, payload: postID})
    })
    .catch(err => console.log(err))
}

export const makePost = (newPost) => (dispatch) => {
    dispatch({ type: LOADING_UI})
    axios.post('/post', newPost)
    .then(res => {
        dispatch({
            type: MAKE_POST,
            payload: res.data
        })
        dispatch(clearErrors())
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

//this is an action creator
export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS })
}

export const getPost = (postID) => dispatch => {
    dispatch({ type: LOADING_UI })
    axios.get(`/post/${postID}`)
        .then(res => {
            dispatch({
                type: SET_POST,
                payload: res.data
            })
            dispatch({ type: STOP_LOADING_UI})
        })
        .catch(err => console.log(err))
}

export const getUserData = (userAT) => dispatch => {
    dispatch({ type: LOADING_DATA})
    axios.get(`/user/${userAT}`)
        .then(res => {
            dispatch({
                type: SET_POSTS,
                payload: res.data.posts
            })

        })
        .catch(() => {
            dispatch({
                type: SET_POSTS,
                payload: null
            })
        })
}