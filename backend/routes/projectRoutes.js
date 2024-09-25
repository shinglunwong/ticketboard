const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

router.get('/', projectController.getAllProjects);
router.get('/:id', adminMiddleware, projectController.getProjectById);
router.get('/:id/tickets', projectController.getTicketsByProjectId);
router.post('/create', adminMiddleware, projectController.createProject);
router.post('/:id', adminMiddleware, projectController.updateProject);
router.post('/:id/delete', adminMiddleware, projectController.deleteProject);

module.exports = router;