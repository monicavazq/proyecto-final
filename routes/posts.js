const express = require('express')
const routerPosts = express.Router()

const { getPosts,createPost, newPost, showPost, deletePost, showPostForm , traerPostCard } = require('../controllers/posts')
const isAuthenticated = require('../middlewares/isauthenticated')

// Rutas de INDEX

routerPosts.get('/', traerPostCard)

routerPosts.get('/posts', isAuthenticated, getPosts)
routerPosts.get('/posts/new',isAuthenticated, newPost)
routerPosts.get('/posts/edit/:id', isAuthenticated, showPostForm )
routerPosts.get('/posts/:slug',isAuthenticated, showPost)

routerPosts.post('/posts', isAuthenticated, createPost)

routerPosts.delete('/posts/:id', isAuthenticated, deletePost)


module.exports = {
    routerPosts
}