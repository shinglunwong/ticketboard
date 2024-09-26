const Ticket = require('../models/Ticket');

exports.getTicketById = (id) => {
    return Ticket.findById(id);
};

exports.getTicketsByProjectId = async (projectId, user) => {
    const tickets = await Ticket.findAllByProjectId(projectId);
    return tickets;
}

exports.createTicket = (ticketData) => {
    return Ticket.create(ticketData);
};

exports.updateTicket = (id, ticketData) => {
    return Ticket.update(id, ticketData);
};

exports.deleteTicket = (id) => {
    return Ticket.delete(id);
};