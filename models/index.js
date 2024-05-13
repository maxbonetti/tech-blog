const router = require('express').Router();
const { getPosts } = require('../controllers/post-controllers');

router.get('/', getPosts);

module.exports = router;