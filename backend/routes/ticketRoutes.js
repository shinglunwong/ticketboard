const express = require('express');
const router = express.Router({ mergeParams: true });
const ticketController = require('../controllers/ticketController');

router.get('/', ticketController.getAllTickets);
router.get('/:id', ticketController.getTicketById);
router.post('/', ticketController.createTicket);
router.post('/:id', ticketController.updateTicket);
router.delete('/:id', ticketController.deleteTicket);

module.exports = router;