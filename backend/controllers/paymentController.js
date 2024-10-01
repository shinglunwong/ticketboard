const paymentService = require('../services/paymentService');

exports.getPaymentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payment = await paymentService.getPaymentById(id);
        res.json({
            message: 'successful',
            payment
        });
    } catch (error) {
        next(error);
    }
};

exports.createPayment = async (req, res, next) => {
    try {
        const paymentData = req.body;
        const createdPayment = await paymentService.createPayment(paymentData);
        res.status(201).json({
            message: 'successful',
            payment: createdPayment,
        });
    } catch (error) {
        next(error);
    }
};

exports.updatePayment = async (req, res, next) => {
    try {
        const paymentId = req.params.id;
        const paymentData = req.body;
        const updatedPayment = await paymentService.updatePayment(paymentId, paymentData);
        res.json({
            message: 'successful',
            payment: updatedPayment,
        });
    } catch (error) {
        next(error);
    }
};

exports.deletePayment = async (req, res, next) => {
    try {
        const paymentId = req.params.id;
        await paymentService.deletePayment(paymentId);
        res.status(204).json({
            message: 'payment deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};