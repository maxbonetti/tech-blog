const router = require('express').Router();
const { getPosts } = require('../controllers/post-routes');

router.get('/', getPosts);

module.exports = router;