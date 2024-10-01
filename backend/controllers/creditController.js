const creditService = require('../services/creditService');

exports.create = async (req, res, next) => {
    try {
        const creditData = req.body;
        const createdCredit = await creditService.createCredit(creditData);
        res.status(201).json({
            message: 'successful',
            credit: createdCredit,
        });
    } catch (error) {
        next(error);
    }
};