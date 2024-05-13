const router = require('express').Router();

const postRoutes = require('./post-controllers');
const userRoutes = require('./user-controllers');
const dashboardRoutes = require('./dashboard-controllers');

router.use('/posts', postRoutes);
router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;