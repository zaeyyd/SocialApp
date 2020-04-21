import { SET_USER, CLEAR_ERRORS, LOADING_UI, SET_ERRORS, SET_UNAUTHED, LOADING_USER } from '../types'
import axios from 'axios'


const setAuthHeader = (token) => {
    const FBIDToken = `Bearer ${token}`
    localStorage.setItem('FBIdToken',FBIDToken )
    axios.defaults.headers.common['Authorization'] = FBIDToken
}


export const signInUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI})
    axios.post('/signin', userData)
        .then((res) => {
          

            setAuthHeader(res.data.token)
            dispatch(getUserData())
            dispatch({ type: CLEAR_ERRORS})
            history.push('/')  // goes back to homepage
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const signUpUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI})
    axios.post('/signup', newUserData)
        .then((res) => {
          

            setAuthHeader(res.data.token)
            dispatch(getUserData())
            dispatch({ type: CLEAR_ERRORS})
            history.push('/')  // goes back to homepage
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER})
    axios.get('/user')
    .then(res => {
        dispatch({
            type: SET_USER,
            payload: res.data
        })
    })
    .catch(err=>{
        console.log(err)
    })
}

export const logOutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken')
    delete axios.defaults.headers.common['Authorization']
    dispatch({ type: SET_UNAUTHED })
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER })
    axios.post('/user/img', formData)
    .then(() => {
        dispatch(getUserData())
    })
    .catch(err => console.log(err))
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER })
    axios.post('/user', userDetails)
    .then(() => {
        dispatch(getUserData())
    })
    .catch(err => console.log(err))
}