const { response } = require("express");

const showAuthFormSignUp = (req, res = response)  => {
    res.render('auth/signup')
}

const signup = (req, res = response)  =>  {
    
}

const showAuthFormSignIn = (req, res = response)  =>  {
    res.render('auth/signin')
    
}

const signin = (req, res = response)  =>  {
    
}
const logout = (req, res = response)  =>  {
    res.send('logout')
    
}

module.exports = {
    showAuthFormSignUp,
    signup,
    showAuthFormSignIn,
    signin,
    logout
}