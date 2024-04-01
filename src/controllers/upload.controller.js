const cloudinary = require('cloudinary');
const {
    uploadProductCloudinary,
    uploadAvatarCloudinary,
    uploadBrandCloudinary,
} = require('../middlewares/uploadFileCloudinary.middleware');

class UploadController {
    static uploadFileToServer(req, res) {
        return res.status(200).json(req.file);
    }
    static async uploadProductCloudinary(req, res) {
        try {
            const result = await uploadProductCloudinary(
                req.file.path,
                req.file.filename,
            );
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    static async uploadAvatarCloudinary(req, res) {
        try {
            const result = await uploadAvatarCloudinary(
                req.file.path,
                req.file.filename,
            );
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    static async uploadBrandCloudinary(req, res) {
        try {
            const result = await uploadBrandCloudinary(
                req.file.path,
                req.file.filename,
            );
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    static getAllFileProduct(req, res) {
        cloudinary.v2.api.resources(
            {
                type: 'upload',
                prefix: 'graduation_project/products',
            },
            (error, result) => {
                if (error) {
                    return res.status(500).json(error);
                }
                return res.status(200).json(result);
            },
        );
    }
}

module.exports = UploadController;
