const express = require('express')
const routerPosts = express.Router()
const { getPosts } = require('../controllers/posts')

// Rutas de INDEX
routerPosts.get('/posts', getPosts)


module.exports = {
    routerPosts
}