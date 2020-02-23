const { admin, db } = require('./admin')


module.exports = (req, res, next) =>
{
    let idToken
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        idToken = req.headers.authorization.split('Bearer ')[1]
    }
    else{
        console.error('no token found')
        return res.status(403).json({ error: 'unauthorized'})
    }

    admin.auth().verifyIdToken(idToken)
    .then(decodedToken => {
        req.user = decodedToken
        return db.collection('users').where('userID', '==', req.user.uid)
        .limit(1)
        .get()
    })
    .then(data => {
        req.user.AT = data.docs[0].data().AT
        return next()
    })
    .catch(err => {
        console.error('Error while varifying token' ,err)
        return res.status(403).json(err)
    })
} 