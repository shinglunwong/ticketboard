const express = require('express');
const router = express.Router({ mergeParams: true });
const deploymentController = require('../controllers/deploymentController');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

// router.get('/', deploymentController.getAllDeployments);
router.get('/:id', deploymentController.getDeploymentById);
router.post('/create', deploymentController.createDeployment);
router.post('/:id', deploymentController.updateDeployment);
router.post('/:id/delete', adminMiddleware, deploymentController.deleteDeployment);

module.exports = router;