const router = require('express').Router();
const { getUserPosts } = require('./post-controllers');

router.get('/', getUserPosts);

module.exports = router;