const ErrorResponse = require('../utils/errorResponse');
const Ticket = require('../models/Ticket');

exports.getAllTickets = (projectId) => {
    // get by user id -> project id -> tickets
    return Ticket.findAllByProjectId(projectId);
};

exports.getTicketById = (id) => {
    return Ticket.findById(id);
};

exports.getTicketsByProjectId = async (projectId, user) => {

}

exports.createTicket = (ticketData) => {
    return Ticket.create(ticketData);
};

exports.updateTicket = (id, ticketData) => {
    return Ticket.update(ticketData, {
        where: { id },
    });
};

exports.deleteTicket = (id) => {
    return Ticket.destroy({
        where: { id },
    });
};