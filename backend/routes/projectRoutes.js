const express = require('express');
const router = express.Router();
const ticketRoutes = require('./ticketRoutes');

const projectController = require('../controllers/projectController');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

router.use(adminMiddleware);

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.post('/create', projectController.createProject);
router.post('/:id', projectController.updateProject);
router.post('/:id/delete', projectController.deleteProject);

// Nested Ticket Routes
router.use('/:projectId/tickets', ticketRoutes);

module.exports = router;