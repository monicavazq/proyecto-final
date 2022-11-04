const { response } = require('express')
const Post = require('../models/posts')

// mostrar los post en cards
const traerPostCard = async (req, res = response)  => {

    try {

        const posts = await Post.find({}).lean()
        // console.log(posts)
        const title = "InfoBlog - Inicio"
        res.status(200).render('home',
            {
                title,
                posts,
            }
        )

    } catch (error) {
        console.log('Error index', error)

    }
}


//index
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({user: req.user.id}).lean()
        // console.log(posts)
        const title = "InfoBlog - Listado de Post";
        res.status(200).render("index",
            {
                title,
                posts,
            });
    } catch (error) {
        console.log('Error index', error)
    }
};

// show
const showPost = async (req, res = response) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug }).lean()
        if (post === null) res.redirect("/")

        res.render('show', {
            title: `InfoBlog - ${post.title}`,
            post,
        })
    } catch (error) {
        console.log('error show', error)
    }
};

// delete

const deletePost = async (req, res = response) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.redirect('/posts')
    } catch (error) {
        console.log('ERROR DELETE', error)
    }
}


// NEW

const newPost = (req, res = response) => {
    res.status(200).render('new')
}

//create

const createPost = async(req, res = response) => {

    try {
       // console.log(req.body)
        let post = new Post()

        post.title = req.body.title
        post.body = req.body.body
        post.user = req.user.id

        post = await post.save()
        res.redirect(`/posts/${post.slug}`)

    } catch (error) {
    console.log('ERROR CREATE', error)
    }
}
//show Form Edit Post

const showPostForm = async (req, res = response) => {

    try {
        const post = await Post.findById(req.params.id)
        res.render('edit', {
            title:'Editando Post', 
            post
        })
    } catch (error) {
        console.log('Show Edit Post', error)
    }
}

module.exports = {
    getPosts,
    showPost,
    deletePost,
    newPost,
    createPost,
    showPostForm,
    traerPostCard
}
