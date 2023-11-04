const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { authMiddleware } = require('../middleWare/authMiddleWare');


router.post('/signup', userController.createUser)
router.post('/login', userController.loginUser)

router.put('/update-user/:id', userController.updateUser)
router.delete('/delete-user/:id',authMiddleware, userController.deleteUser)
router.get('/getAll',authMiddleware, userController.getAllUser)
router.get('/get-detail/:id',authMiddleware, userController.getDetailUser)

module.exports = router;