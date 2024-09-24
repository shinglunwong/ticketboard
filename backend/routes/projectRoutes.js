const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

router.use(adminMiddleware);

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.get('/:id/tickets', projectController.getTicketsByProjectId);
router.post('/create', projectController.createProject);
router.post('/:id', projectController.updateProject);
router.post('/:id/delete', projectController.deleteProject);

module.exports = router;