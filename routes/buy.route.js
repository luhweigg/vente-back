const express = require('express');
const router = express.Router();
const buyController = require('../controllers/buy.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

router.use(requireAuth);

router.put('/:itemId', buyController.updateBuy);

module.exports = router;