const ticketService = require('../services/ticketService');

exports.getAllTickets = async (req, res, next) => {
    const { projectId } = req.params;
    try {
        const tickets = await ticketService.getAllTickets(projectId);
        res.json({
            message: 'successful',
            tickets,
        });
    } catch (error) {
        next(error);
    }
};

exports.getTicketById = async (req, res, next) => {
    try {
        const ticketId = req.params.id;
        const ticket = await ticketService.getTicketById(ticketId);
        res.json({
            message: 'successful',
            ticket
        });
    } catch (error) {
        next(error);
    }
};

exports.createTicket = async (req, res, next) => {
    try {
        const ticketData = req.body;
        const createdTicket = await ticketService.createTicket(ticketData);
        res.status(201).json({
            message: 'successful',
            ticket: createdTicket,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateTicket = async (req, res, next) => {
    try {
        const ticketId = req.params.id;
        const ticketData = req.body;
        const updatedTicket = await ticketService.updateTicket(ticketId, ticketData);
        res.json({
            message: 'successful',
            ticket: updatedTicket,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteTicket = async (req, res, next) => {
    try {
        const ticketId = req.params.id;
        await ticketService.deleteTicket(ticketId);
        res.status(204).json({
            message: 'ticket deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};