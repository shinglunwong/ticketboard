const express = require('express');
const router = express.Router();
const configController = require('../controllers/configController');

router.get('/', configController.getAllConfigs);
router.get('/:id', configController.getConfigById);
router.post('/create', configController.createConfig);
router.post('/:id', configController.updateConfig);
router.post('/:id/delete', configController.deleteConfig);

module.exports = router;