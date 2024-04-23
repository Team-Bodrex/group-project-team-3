const express = require('express');
const UserController = require('../Controllers/UserController');
const router = express.Router();


router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/github-login', UserController.githubLogin);




module.exports = router;