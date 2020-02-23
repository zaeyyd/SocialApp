const functions = require('firebase-functions');
const app = require('express')()

const FBAuth = require('./util/FBAuth')


const { getAllPosts, sendPost } = require('./handlers/posts')
const { signup, signin, uploadImg } = require('./handlers/users')


// see all posts
app.get('/posts', getAllPosts)
// send new post
app.post('/post', FBAuth, sendPost)
// set profile pic
app.post('/user/img', uploadImg)


// sign up
app.post('/signup', signup )
// sign in
app.post('/signin', signin)


exports.api = functions.https.onRequest(app)