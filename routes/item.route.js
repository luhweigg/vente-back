const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const multerConfig = require('../middlewares/multer-config');

router.use(requireAuth);

router.get('/me', itemController.getAllMyItems);
router.get('/', itemController.getAllItems);
router.post('/', multerConfig, itemController.createItem);

router.get('/:itemId', itemController.getOneItem);
router.delete('/:itemId', itemController.deleteItem);

module.exports = router;