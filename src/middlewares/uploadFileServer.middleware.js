const multer = require('multer');
const appRoot = require('app-root-path');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + `/src/public/images/`);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const uploadToServer = multer({ storage: storage });

module.exports = uploadToServer;
