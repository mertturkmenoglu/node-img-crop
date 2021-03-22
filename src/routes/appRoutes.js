const express = require('express');

const appController = require('../controllers/appController');

const router = express.Router();

router.get('/', appController.getHomePage);

router.get('/image-upload', appController.getImageUploadPage);

router.post('/image-upload', appController.postImageUpload);

module.exports = router;