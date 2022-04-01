const express = require('express');

const feedController = require('../controllers/feed');

const router = express.Router();
const isAuth = require('../middleware/is-auth');
// GET /feed/posts
router.get('/posts', isAuth, feedController.getPosts);

// POST /feed/post
router.post('/post', isAuth,  feedController.createPost);
router.get('/post/:postId', isAuth, feedController.getPost);
router.put('/post/:postId', isAuth, feedController.updatePost);
router.delete('/post/:postId', isAuth, feedController.deletePost);
/*router.get('/postt/:tag', isAuth, feedController.getPost1);*/
module.exports = router;