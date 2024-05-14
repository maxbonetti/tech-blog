// post route controller
const router = require('express').Router();
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

const updatePost = async (req, res) => {
    try {
      const updatedPost = await Post.update(req.body, {
        where: {
          id: req.params.id,
          user_id: req.session.userId // Ensures users can only update their own posts
      }});
      if (!updatedPost) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  const deletePost = async (req, res) => {
    try {
      const result = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.userId // Ensures users can only delete their own posts
      }});
      if (!result) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.status(200).json({ message: 'Post deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  };

const getUserPosts = async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.userId
      },
      order: [['date_created', 'DESC']]
    });
    const posts = postData.map(post => post.get({ plain: true }));

    res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
};



module.exports = {
    getPosts,
    getUserPosts,
    updatePost,
    deletePost,
};