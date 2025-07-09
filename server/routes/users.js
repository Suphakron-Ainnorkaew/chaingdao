const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/:userId', userController.getProfile);
router.put('/password', auth, userController.updatePassword);

module.exports = router;