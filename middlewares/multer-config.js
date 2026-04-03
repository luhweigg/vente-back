const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const CloudinaryStorageModule = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

let storage;
if (CloudinaryStorageModule.CloudinaryStorage) {
  storage = new CloudinaryStorageModule.CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'vente_app',
      allowedFormats: ['jpg', 'png', 'jpeg', 'webp']
    }
  });
} else {
  storage = CloudinaryStorageModule({
    cloudinary: cloudinary,
    folder: 'vente_app',
    allowedFormats: ['jpg', 'png', 'jpeg', 'webp']
  });
}

module.exports = multer({ storage: storage }).single('image');