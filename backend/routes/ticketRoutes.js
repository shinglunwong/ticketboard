const express = require('express');
const router = express.Router({ mergeParams: true });
const ticketController = require('../controllers/ticketController');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

// router.get('/', ticketController.getAllTickets);
router.get('/:id', ticketController.getTicketById);
router.post('/', ticketController.createTicket);
router.post('/:id', ticketController.updateTicket);
router.post('/:id/delete', adminMiddleware, ticketController.deleteTicket);

module.exports = router;