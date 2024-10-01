const express = require('express');
const router = express.Router({ mergeParams: true });
const paymentController = require('../controllers/paymentController');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

router.get('/:id', paymentController.getPaymentById);
router.post('/', adminMiddleware, paymentController.createPayment);
router.post('/:id', adminMiddleware, paymentController.updatePayment);
router.post('/:id/delete', adminMiddleware, paymentController.deletePayment);

module.exports = router;