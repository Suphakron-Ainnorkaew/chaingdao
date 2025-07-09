const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const postController = require('../controllers/postController');

router.post('/', auth, postController.createPost);
router.get('/', postController.getRecentPosts);
router.get('/all', postController.getAllPosts);
router.post('/:postId/like', auth, postController.likePost);

module.exports = router;