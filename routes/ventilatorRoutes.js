const authMiddleware = require('../middlewares/authMiddleware');
const ventilatorController = require('../controllers/ventilatorController');

const router = require('express').Router();

router.route('/').get(authMiddleware.isSignedIn, authMiddleware.checkAuth, ventilatorController.getVentilatorData).post(authMiddleware.isSignedIn, authMiddleware.checkAuth,ventilatorController.pushVentilatorData);

module.exports = router;