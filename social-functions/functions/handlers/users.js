const { db } = require('../util/admin')
const firebaseConfig = require('../util/firebaseConfig')

const firebase = require('firebase')
firebase.initializeApp(firebaseConfig)

const { validateSignUpData, validateSignInData } = require('../util/validators')

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
                    res.status(500).json({ error: 'there was an error'})
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

exports.uploadImg = (req,res) => {
    const BusBoy = require('busboy')
    const path = require('path')
    const os = require('os')
    const fs = require('fs')


    const busboy = new BusBoy({ headers: req.headers})
    let imageFileName
    let imageToBeUploaded = {}


    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        const imageEx = filename.split('.')[filename.split('.').length - 1]

        imageFileName = `${Math.round(Math.random()*1000000)}.${imageEx}`

        const filepath = path.join(os.tmpdir(), imageFileName)

    })
}

