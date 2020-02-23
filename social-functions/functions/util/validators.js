// helper methods
const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(emailRegEx)) return true
    else return false
}

const isEmpty = (string) => {
    if(string.trim() === '') return true
    else return false
}


exports.validateSignUpData = (newUser) => {
    let errors = {}

if(isEmpty(newUser.email)){
    errors.email = 'must not be empty'

}
else if(!isEmail(newUser.email)){
    errors.email = "Must be valid email"

}

if(isEmpty(newUser.AT)){
    errors.AT = 'must not be empty'
}

if(isEmpty(newUser.password)){
    errors.password = 'must not be empty'
}
if(newUser.password !== newUser.pwConfirm) errors.pwConfirm = "Passwords do not match"





 return {
     errors,
     valid: Object.keys(errors).length === 0 ? true : false
 }
}

exports.validateSignInData = (user) => {
    let errors = {}

    if(isEmpty(user.email)) errors.email = "Must not be empty"
    if(isEmpty(user.password)) errors.password = "Must not be empty"

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }

    
}