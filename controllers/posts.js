const { response } = require('express')
const Post = require('../models/posts')
//index
const getPosts = async (req, res) => {
    
    try {
    
        const posts = await Post.find({}).lean()
       // console.log(posts)
        const title = "InfoBlog - Listado de Posts"        
        res.status(200).render('index',
            {
                title,
                posts
            }
        )

    } catch (error) {
        console.log('Error index', error)
        
    }
}
// show
const showPost = async (req, res = response) => {
    try {
        const post = await Post.findOne({ slug : req.params.slug }).lean()
        if ( post === null ) return res.redirect('/')

    res.render('show', 
    {
        title: `InfoBlog - ${post.title}`,
        post
    });
    } catch (error) {
        console.log('error show', error)
    }
}

module.exports = {
    getPosts,
    showPost
}
