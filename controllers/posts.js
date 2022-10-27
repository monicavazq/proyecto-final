const Post = require('../models/posts')

const getPosts = async (req, res) => {
    
    try {
    
        const posts = await Post.find({}).lean()
       // console.log(posts)
        const title = "Listado de Posts"        
        res.status(200).render('index',
            {
                title,
                posts
            }
        )

    } catch (error) {
        console.log(error)
        
    }
}

module.exports = {
    getPosts
}
