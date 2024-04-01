const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png', 'gif'],
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const uploadProductCloudinary = async (path, filename) => {
    try {
        const result = await cloudinary.uploader.upload(path, {
            folder: 'graduation_project/products/',
            public_id: `${filename}`,
        });
        const { created_at, url, secure_url, folder } = result;
        return {
            status: 'Success',
            created_at,
            url,
            secure_url,
            folder,
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                status: 'failed',
                message: error.message,
            };
        }
    }
};
const uploadAvatarCloudinary = async (path, filename) => {
    try {
        const result = await cloudinary.uploader.upload(path, {
            folder: 'graduation_project/avatars/',
            public_id: `${filename}`,
        });
        const { created_at, url, secure_url, folder } = result;
        return {
            status: 'Success',
            created_at,
            url,
            secure_url,
            folder,
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                status: 'failed',
                message: error.message,
            };
        }
    }
};

const uploadBrandCloudinary = async (path, filename) => {
    try {
        const result = await cloudinary.uploader.upload(path, {
            folder: 'graduation_project/brands/',
            public_id: `${filename}`,
        });
        const { created_at, url, secure_url, folder } = result;
        return {
            status: 'Success',
            created_at,
            url,
            secure_url,
            folder,
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                status: 'failed',
                message: error.message,
            };
        }
    }
};
const uploadCloudinary = multer({ storage: storage });

module.exports = {
    uploadCloudinary,
    uploadAvatarCloudinary,
    uploadBrandCloudinary,
    uploadProductCloudinary,
};
