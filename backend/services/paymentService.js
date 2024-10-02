const Payment = require('../models/Payment');

exports.getPaymentById = (id) => {
    return Payment.findById(id);
};

exports.getPaymentsByProjectId = async (projectId) => {
    const payments = await Payment.findAllByProjectId(projectId);
    return payments;
}

exports.createPayment = (paymentData) => {
    return Payment.create(paymentData);
};

exports.updatePayment = (id, paymentData) => {
    return Payment.update(id, paymentData);
};

exports.deletePayment = (id) => {
    return Payment.delete(id);
};