const { db,admin } = require('../util/admin')
const firebaseConfig = require('../util/firebaseConfig')

const firebase = require('firebase')
firebase.initializeApp(firebaseConfig)

const { validateSignUpData, validateSignInData, reduceUserDetails } = require('../util/validators')

exports.signup = (req, res) =>
{
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        pwConfirm: req.body.pwConfirm,
        AT: req.body.AT
    }

    const { valid, errors } = validateSignUpData(newUser)

    if(!valid) return res.status(400).json(errors)

    const noImg = 'no-img.png'
        
    let token, userID;

        db.doc(`/users/${newUser.AT}`).get()
            .then(doc => {
                if(doc.exists){
                    return res.status(400).json({ AT: 'this @ is already taken'})
                }
                else{
                    return  firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
                }
            })
            .then(data => {
                userID = data.user.uid
                return data.user.getIdToken()
            })
            .then(tokenID => {
                token = tokenID
                const userCredentials = {
                    AT: newUser.AT,
                    email: newUser.email,
                    createTime: new Date().toISOString(),
                    imgURL: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${noImg}?alt=media`,
                    userID
                }
                return db.doc(`/users/${newUser.AT}`).set(userCredentials)
            })
            .then(() => {
                return res.status(201).json({token})
            })
            .catch( err => {
                if(err.code === 'auth/email-already-in-use'){
                    res.status(500).json({ email: 'email in use'})
                console.error(err)
                }
                else{
                    res.status(500).json({ error: `${err}`})
                    console.error(err)
                }
                
            })
            
    
}

exports.signin = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,

    }

    const { valid, errors } = validateSignInData(user)

    if(!valid) return res.status(400).json(errors)

    

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
        return data.user.getIdToken()

    })
    .then(token => {
        return res.json({token})
    })
    .catch(
        err => {
            console.error(err)
            if(err.code === 'auth/wrong-password'){
                return res.status(403).json({ general: 'wrong information'})
            }
            return res.status(500).json({ error: error.code})
        }
    )


}

exports.addUserDetails = (req, res) => {
    let userDetails = reduceUserDetails(req.body)

    db.doc(`/users/${req.user.AT}`).update(userDetails)
    .then(()=> {
        return res.json({ message: 'Details added'})
    })
    .catch(err => {
        return res.status(500).json({ error: err.code})
    })
}

exports.getUserDetails = (req, res) => {
    let userData = {}

    db.doc(`/users/${req.user.AT}`).get()
    .then((doc)=> {
        if(doc.exists){
            userData.credentials = doc.data()
            return db.collection('likes').where('userAT', '==', req.user.AT).get()
        }
    })
    .then(data => {
        userData.likes = []
        data.forEach(doc => {

            userData.likes.push(doc.data())
        })

        return res.json(userData)
    })
    .catch(err => {
        console.error(err)
        return res.status(500).json({ error: err.code})
    })
}

exports.uploadImg = (req,res) => {
    const BusBoy = require('busboy')
    const path = require('path')
    const os = require('os')
    const fs = require('fs')


    const busboy = new BusBoy({ headers: req.headers})
    let imageFileName
    let imageToBeUploaded = {}


    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {

        if(mimetype !== 'image/jpeg' && mimetype !== 'image/png'){
            return res.status(400).json({ error: "Wrong file type"})
        }
 
        const imageEx = filename.split('.')[filename.split('.').length - 1]

        imageFileName = `${Math.round(
            Math.random() * 1000000000000
          ).toString()}.${imageEx}`

        const filepath = path.join(os.tmpdir(), imageFileName)

        imageToBeUploaded = { filepath, mimetype }
        file.pipe(fs.createWriteStream(filepath))

    })
    busboy.on('finish', () => {
        admin.storage().bucket(`${firebaseConfig.storageBucket}`).upload(imageToBeUploaded.filepath, {
            resumable: false,
            metadata: {
                metadata:{
                    contentType: imageToBeUploaded.mimetype
                }
            }
        })  
        .then(()=> {
            const imgURL = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`
            return db.doc(`/users/${req.user.AT}`).update({ imgURL })
        })
        .then(()=>{
            return res.json({ message: 'Image uploaded'})
        })
        .catch(err => {
            console.error(err)
            return res.status(500).json({err: `${err}`})
        })
    }) 
    busboy.end(req.rawBody)



}


