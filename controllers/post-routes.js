// post route controller
const { Post } = require('../models/Posts');

const getPosts = async (req, res) => {
    try {
        const postData = await Post.findAll({
            order: [['dated_created', 'DESC']]
        });
        const posts = postData.map(post => post.get({ plain:true }));
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json({ message: `An error occurred`, err })
    }
};


module.exports = {
    getPosts
};