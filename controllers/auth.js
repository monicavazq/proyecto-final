const { response, json } = require("express");
const passport = require("passport")
const Auth = require("../models/auth");

const showAuthFormSignUp = (req, res = response) => {
    res.render('auth/signup')
}

const signup = async (req, res = response) => {
    const errors = []
    const { name, email, password, confirm_password } = req.body

    if (password !== confirm_password) {
        errors.push({ msg: ' La contraseña no coincide.' })
    }

    if (password.length < 4) {
        errors.push({ msg: 'La contraseña debe tener al menos 4 caracteres' })
    }

    if (errors.length > 0) {
        return res.render('auth/signup', {
            errors,
            name,
            email
        })
    }

    const userFound = await Auth.findOne({ email })
    if (userFound) {
        req.flash('todo_error', 'El mail ya existe en nuestro registro')
        return res.redirect('/auth/signup')
    }

    const newUser = new Auth({ name, email, password })
    newUser.password = await newUser.passwordEncrypt(password)
    await newUser.save()
    req.flash("todo_ok", "Se registró correctamente")
    res.redirect('/auth/signin')

}

const showAuthFormSignIn = (req, res = response) => {
    res.render('auth/signin')

}

const signin = passport.authenticate('local', {
    successRedirect: "/posts",
    faiureRedirect: '/auth/signin',
    failureFlash: true,
})

const profile = (req, res = response) => {
    const { name, email} = req.user    
    res.json({name,email})
}

const logout = async(req, res = response, next) => {    
await req.logout((err) => {
    if( err ) return next()
    res.redirect('/auth/signin')
})
}

module.exports = {
    showAuthFormSignUp,
    signup,
    showAuthFormSignIn,
    signin,
    logout,
    profile
}