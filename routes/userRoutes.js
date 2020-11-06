const userController = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.route('/signup').post(userController.signUp);

router.route('/login').post(userController.login);

module.exports = router;