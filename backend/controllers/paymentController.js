const paymentService = require('../services/paymentService');
const configService = require('../services/configService');
const Payment = require('../models/Payment');
const Project = require('../models/Project');
const User = require('../models/User');
const generatePdf = require('../utils/generatePdf');

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


exports.getPdf = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Fetch payment details
        const payment = await Payment.findById(id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found.' });
        }

        // Fetch project details
        const project = await Project.findByProjectId(payment.project_id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        // Fetch invoice config
        const invoiceConfig = await configService.getInvoiceConfig();

        // Fetch client details
        const client = await User.findById(project.user_id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found.' });
        }

        // Generate and send PDF
        generatePdf({ invoiceConfig, client, payment, project }, res);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'Failed to generate PDF.' });
    }
};