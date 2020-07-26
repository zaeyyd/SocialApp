require("dotenv").config();

const functions = require('firebase-functions');
const app = require('express')()

const FBAuth = require('./util/FBAuth')
const { db } = require('./util/admin')

const cors = require('cors')

app.use(cors())
// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin', ['*']);
//     next();
// });

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
        else{
            return res.status(404).json({ error: ' does not exist'})
        }
    })
    .catch(err=>{
        console.error(err)
    })
})

exports.deleteUnLikeNotification = functions
.region('us-central1')
.firestore.document('likes/{id}')
.onDelete((snapshot)=>{
    return db.doc(`/notifications/${snapshot.id}`)
    .delete()
    .catch((err)=>{
        console.error(err)
    })
})

exports.createCommentNotification = functions
.region('us-central1')
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
       
    })

})

exports.userImageChange = functions
.region('us-central1')
.firestore.document('/users/{userID}')
.onUpdate((change)=>{
    console.log(change.before.data())
    console.log(change.after.data())

    if(change.before.data().imgURL !== change.after.data().imgURL){
        console.log('image has changed')

        let batch = db.batch()

        return db.collection('posts').where('userAT', '==', change.before.data().AT).get()
        .then((data)=> {
          data.forEach(doc => {
              const post = db.doc(`/posts/${doc.id}`)
              batch.update(post, {userIMG: change.after.data().imgURL})
        })
        return batch.commit()
    })
    }
    else return true

})

exports.onPostDelete = functions
.region('us-central1')
.firestore.document('/posts/{postID}')
.onDelete((snapshot, context) => {
    const postID = context.params.postID 
    const batch = db.batch()
    return db.collection('comments')
    .where('postID', '==', postID)
    .get()
    .then(data => {
        data.forEach(doc => {
            batch.delete(db.doc(`/comments/${doc.id}`))
        })
        return db.collection('likes').where('postID', '==', postID).get()
    })
    .then(data => {
        data.forEach(doc => {
            batch.delete(db.doc(`/likes/${doc.id}`))
        })
        return db.collection('notifications').where('postID', '==', postID).get()
    })
    .then(data => {
        data.forEach(doc => {
            batch.delete(db.doc(`/notifications/${doc.id}`))
        })
        return batch.commit()
    })
    .catch( err => {
        console.error(err)
    })

})
