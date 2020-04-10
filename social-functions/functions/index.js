require("dotenv").config();

const functions = require('firebase-functions');
const app = require('express')()

const FBAuth = require('./util/FBAuth')
const { db } = require('./util/admin')

const { getAllPosts, sendPost, getPost, postComment, like, unlike, deletePost } = require('./handlers/posts')
const { signup, signin, uploadImg, addUserDetails, getUserDetails, getUserInfo, markNotificRead } = require('./handlers/users')

// post routes
app.get('/posts', getAllPosts)
app.post('/post', FBAuth, sendPost)
app.delete('/post/:postID', FBAuth, deletePost)
app.get('/post/:postID', getPost)
app.get('/post/:postID/like', FBAuth, like)
app.get('/post/:postID/unlike', FBAuth, unlike)
app.post('/post/:postID/comment', FBAuth, postComment)


// user routes
app.post('/user', FBAuth, addUserDetails)
app.get('/user', FBAuth, getUserDetails)
app.post('/user/img',FBAuth, uploadImg)
app.post('/signup', signup )
app.post('/signin', signin)
app.get('/user/:AT', getUserInfo)
app.post('/notifications', FBAuth, markNotificRead)

exports.api = functions.https.onRequest(app)

exports.createLikeNotification = functions
.region('us-central1')
.firestore.document('likes/{id}')
.onCreate((snapshot)=>{
    
    return db.doc(`/posts/${snapshot.data().postID}`)
    .get()
    .then( (doc) => {
        if(doc.exists && (doc.data().userAT !== snapshot.data().userAT)){
            return db.doc(`/notifications/${snapshot.id}`).set({
                createTime: new Date().toISOString(),
                recipient: doc.data().userAT,
                sender: snapshot.data().userAT,
                type: 'like',
                read: false,
                postID: doc.id  
                
            })
        }
    })
    .catch(err=>{
        console.error(err)
    })
})

exports.deleteUnLikeNotification = functions.region('us-central1').firestore.document('likes/{id}')
.onDelete((snapshot)=>{
    db.doc(`/notifications/${snapshot.id}`)
    .delete()
    .then(()=>{
        return
    })
    .catch((err)=>{
        console.error(err)
        return;
    })
})

exports.createCommentNotification = functions.region('us-central1')
.firestore.document('comments/{id}')
.onCreate((snapshot)=>{
    return db.doc(`/posts/${snapshot.data().postID}`).get()
    .then( doc => {
        if(doc.exists && doc.data().userAT !== snapshot.data().userAT){
            return db.doc(`/notifications/${snapshot.id}`).set({
                createTime: new Date().toISOString(),
                recipient: doc.data().userAT,
                sender: snapshot.data().userAT,
                type: 'comment',
                read: false,
                postID: doc.id  
                
            })
        }
    })
    .catch(err=>{
        console.error(err)
        return;
    })

})