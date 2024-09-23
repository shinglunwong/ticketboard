const ErrorResponse = require('../utils/errorResponse');
const Ticket = require('../models/Ticket');
const Project = require('../models/Project');

async function verifyUserAccessToTicket(ticketId, userId) {
    // Fetch the ticket by ID
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
        throw new ErrorResponse('Ticket not found', 404);
    }

    // Fetch the related project
    const project = await Project.findById(ticket.project_id);
    if (!project) {
        throw new ErrorResponse('Project not found for the ticket', 404);
    }

    // Check if the user owns the project
    if (project.user_id !== userId) {
        throw new ErrorResponse('Access denied: You do not own this project');
    }

    // Access granted
    return true;
}

module.exports = {
    verifyUserAccessToTicket,
};