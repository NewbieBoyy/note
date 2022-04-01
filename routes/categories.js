const express = require('express');
const isAuth = require('../middleware/is-auth');
const categoriesController = require('../controllers/categories');

const router = express.Router();

// GET /feed/posts
// POST /feed/post
router.get('/posts', isAuth, categoriesController.getPosts);
router.post('/post', isAuth, categoriesController.createPost);
router.get('/post/:postId', isAuth, categoriesController.getPost);
router.put('/post/:postId', isAuth, categoriesController.updatePost);
router.delete('/post/:postId', isAuth, categoriesController.deletePost);

module.exports = router;