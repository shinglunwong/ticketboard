const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

router.use(adminMiddleware);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/create', userController.createUser);
router.post('/:id', userController.updateUser);
router.post('/:id/delete', userController.deleteUser);

module.exports = router;