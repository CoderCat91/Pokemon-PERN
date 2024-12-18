const { Router } = require('express');
const { getUsers, register, login, protected, logout } = require('../controllers/auth');
const { registerValidation, loginValidation } = require('../validators/auth');
const { validationMiddleware } = require('../middleware/middleware');
const { userAuth } = require('../middleware/middleware');

const router = Router();

router.get('/get-users', userAuth, getUsers);  
router.get('/protected', userAuth, protected); 
router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);
router.get('/logout', logout);

module.exports = router;
