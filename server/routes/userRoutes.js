const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticateJWT');
const {
    registerUser,
    loginUser,
    getCurrentUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/me', authenticateJWT, getCurrentUser);

router.put('/me', authenticateJWT, updateUser);

router.delete('/me', authenticateJWT, deleteUser);

module.exports = router;
