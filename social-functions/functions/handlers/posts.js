const { db } = require('../util/admin')

exports.getAllPosts = (req,res) => {
    db
    .collection('posts')
    .orderBy('createTime', 'desc')
    .get()
    .then(data => {
        let posts = []
        data.forEach(doc => {
            posts.push({
                postID: doc.id,
                body: doc.data().body,
                userAT: doc.data().userAT,
                createTime: doc.data().createTime,
                userIMG: doc.data().userIMG,
                likeCount: doc.data().likeCount,
                commentCount: doc.data().commentCount
            })
        });
        return (res.json(posts))
    })
    .catch(
        err => console.error(err)
    )
}


exports.sendPost = (req,res) => {
    
    const newPost = {
        body: req.body.body,
        userAT: req.user.AT,
        createTime: new Date().toISOString(),
        likeCount: 0,
        commentCount: 0,
        userIMG: req.user.imgURL
        
    }

    db
    .collection('posts')
    .add(newPost)
    .then(doc =>
        {
            const resPost = newPost
            resPost.postID = doc.id   // check back here
            res.json(resPost)
        })
    .catch(err => {
        res.status(500).json({ error: 'something went wrong'})
        console.error(err)
    })
}

exports.getPost = (req,res) => {
    let postData = {}

    db.doc(`/posts/${req.params.postID}`).get()
    .then(doc => {
        if(!doc.exists){
            return res.status(404).json({ error: "Post doesn't exist"})
        }
        postData = doc.data()
        postData.postID = doc.id; // doc.id is a firebase thing

        return db.collection('comments').orderBy('createTime', 'desc').where('postID', '==', req.params.postID).get()
    })
    .then(data => {
        postData.comments = []

        data.forEach(doc => {
            postData.comments.push(doc.data())
        })
        return res.json(postData)
    })
    .catch(err => {
        console.error(err)
        return res.status(500).json(err)
    })
}

exports.postComment = (req,res) => { // increase comment count
    if(req.body.body.trim() == '' || req.body.body.trim() == null){
        return res.status(400).json({ comment: 'Please write something'})
    }

    const newComment = {
        body: req.body.body,
        createTime: new Date().toISOString(),
        postID: req.params.postID,
        userAT: req.user.AT,
        userIMG: req.user.imgURL
        
    }

    db.doc(`/posts/${req.params.postID}`).get()
    .then(doc => {
        if(!doc.exists){
            return res.status(404).json({err: "Post not found"})
        }
        return doc.ref.update({ commentCount: doc.data().commentCount + 1})
    })
    .then(()=> {
        return db.collection('comments').add(newComment)
    })
    .then(()=> {
        res.json(newComment)
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({ err: "Error here" })
    })
}

exports.deletePost = (req,res) => {


    const document = db.doc(`/posts/${req.params.postID}`)
    document.get()
    .then(doc => {
        if(!doc.exists){
            return res.status(404).json({ error: err.code })
        }
        if(doc.data().userAT !== req.user.AT){
            res.status(403).json({ error: "not allowed"})
        }
        else{
            return document.delete()
        }
    })
    .then(()=> {
        res.json({ message: "post deleted"})
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({ error: "post not found" })
    })


}

exports.like = (req,res) => {

    const likeDoc = db.collection('likes').where('userAT', '==', req.user.AT).where('postID', '==', req.params.postID).limit(1)

    const postDoc = db.doc(`/posts/${req.params.postID}`)

    let postData

    postDoc.get()
    .then(doc => {
        if(doc.exists){
            postData = doc.data()
            postData.postID = doc.id
            return likeDoc.get()
        }
        else{
            console.log("Post does not exist")
            return res.status(404).json({ error: 'Post doesnt exist '})
        }
    })
    .then(data => {
        if(data.empty){
            return db.collection('likes').add({
                postID: req.params.postID,
                userAT: req.user.AT
            })
            .then(()=> {
                postData.likeCount++
                return postDoc.update({
                     likeCount: postData.likeCount 
                })
            })
            .then(()=>{
                return res.json(postData)
            })
        }
        else{
            return res.status(400).json({ message: "Already liked"})
        }
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({err: err.code})
    })

}


exports.unlike = (req,res) => { // bug when like count is 0, and there is a like, makes a negative like count

    const likeDoc = db.collection('likes').where('userAT', '==', req.user.AT).where('postID', '==', req.params.postID).limit(1)

    const postDoc = db.doc(`/posts/${req.params.postID}`)

    let postData

    postDoc.get()
    .then(doc => {
        if(doc.exists){
            postData = doc.data()
            postData.postID = doc.id
            return likeDoc.get()
        }
        else{
            return res.status(404).json({ error: 'Post doesnt exist '})
        }
    })
    .then(data => {
        if(data.empty){
            return res.status(400).json({ message: "not liked liked"})
            
        }
        else{
            return db.doc(`/likes/${data.docs[0].id}`).delete()
            .then(()=>{
                postData.likeCount-- 
                return postDoc.update({ likeCount: postData.likeCount})
            })
            .then(()=> {
                res.json(postData)
            })
            
        }
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({err: err.code})
    })
    
}

