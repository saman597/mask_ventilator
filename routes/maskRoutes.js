const authMiddleware = require('../middlewares/authMiddleware');
const maskController = require('../controllers/maskController');

const router = require('express').Router();

router.route('/').get(authMiddleware.isSignedIn, authMiddleware.checkAuth, maskController.getMaskData).post(authMiddleware.isSignedIn, authMiddleware.checkAuth,maskController.pushMaskData);

module.exports = router;