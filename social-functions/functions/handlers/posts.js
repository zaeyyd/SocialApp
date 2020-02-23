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
                createTime: doc.data().createTime
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
        createTime: new Date().toISOString()
    }

    db
    .collection('posts')
    .add(newPost)
    .then(doc =>
        {
            res.json({ message: `document ${doc.id} created successfully`})
        })
    .catch(err => {
        res.status(500).json({ error: 'something went wrong'})
        console.error(err)
    })
}