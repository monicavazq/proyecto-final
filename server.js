// const app = require('express')()
const express = require('express')
const { engine } = require('express-handlebars')
const session = require('express-session')
const flash = require("connect-flash")
const MongoStore = require('connect-mongo')
const passport = require('passport')
const methodOverride= require('method-override')
require('dotenv').config()
require('./config/passport')

const { dbConnection } = require('./database/config')
const { routerAuth } = require('./routes/auth')
const { routerDev } = require('./routes/db')
const { routerPosts } = require('./routes/posts')

// Inicializo la aplicación de express
const app = express()

// Conectar a la DB
dbConnection()

// Template Engine
app.engine('hbs', engine({extname: '.hbs'}))
app.set('view engine', 'hbs')
app.set('views', './views')

// Middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))

app.use(
    session({
    secret: process.env.SESSION_SECRET,
    resave:true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_LOCAL_URI})
    })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req, res, next)=>{
    res.locals.todo_ok = req.flash('todo_ok')
    res.locals.todo_error = req.flash('todo_error')
    res.locals.user = req.user || null
    next()
})



// Routes
app.use('/', routerAuth)
app.use('/', routerDev) // Solo para desarrollo
app.use('/', routerPosts)

const PORT = process.env.PORT
app.listen(PORT, err => {
    if ( err ) throw new Error('Ocurrió un problema con el servidor: ', err)
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
})
