const express = require('express');
const router = express.Router();
const creditController = require('../controllers/creditController');

router.post('/', creditController.create);

module.exports = router;