const express = require('express');
const router = express.Router();

const { userRegister, userLogin, getMe } = require ('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware')
router.post('/register',userRegister);
router.post('/login', userLogin);
router.get("/me", authMiddleware, getMe);

module.exports = router;