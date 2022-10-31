const express = require('express')
const routerPosts = express.Router()

const { getPosts,createPost, newPost, showPost, deletePost, showPostForm  } = require('../controllers/posts')

// Rutas de INDEX
routerPosts.get('/posts', getPosts)
routerPosts.get('/posts/new', newPost)

routerPosts.get('/posts/edit/:id', showPostForm )

routerPosts.get('/posts/:slug', showPost)

routerPosts.post('/posts',createPost)

routerPosts.delete('/posts/:id', deletePost)




module.exports = {
    routerPosts
}