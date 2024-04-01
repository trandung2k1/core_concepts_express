const { Router } = require('express');
const {
    uploadCloudinary,
} = require('../middlewares/uploadFileCloudinary.middleware');
const UploadController = require('../controllers/upload.controller');
const {
    verifyTokenAndAdmin,
    verifyTokenAndUserAuthorization,
} = require('../middlewares/auth.middleware');
const uploadToServer = require('../middlewares/uploadFileServer.middleware');
const router = Router();

router.post(
    '/product',
    verifyTokenAndAdmin,
    uploadCloudinary.single('product'),
    UploadController.uploadProductCloudinary,
);
router.post(
    '/avatar',
    verifyTokenAndUserAuthorization,
    uploadCloudinary.single('avatar'),
    UploadController.uploadAvatarCloudinary,
);
router.post(
    '/brand',
    verifyTokenAndAdmin,
    uploadCloudinary.single('brand'),
    UploadController.uploadBrandCloudinary,
);
router.post(
    '/upload-to-server',
    uploadToServer.single('image'),
    UploadController.uploadFileToServer,
);
router.get(
    '/all-file-product',
    verifyTokenAndAdmin,
    UploadController.getAllFileProduct,
);

module.exports = router;
