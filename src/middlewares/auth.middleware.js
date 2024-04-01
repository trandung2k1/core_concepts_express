const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        const accessToken = token.split(' ')[1];
        if (!accessToken) {
            return res.status(404).json({ message: 'Token not found!' });
        } else {
            jwt.verify(
                accessToken,
                process.env.ACCESS_TOKEN_SECRET,
                (error, user) => {
                    if (error?.name === 'TokenExpiredError') {
                        return res
                            .status(403)
                            .json({ message: 'Token is expired!' });
                    } else if (error) {
                        return res
                            .status(403)
                            .json({ message: 'Token is not valid!' });
                    }
                    req.user = user;
                    next();
                },
            );
        }
    } else {
        return res.status(401).json({ message: "You're not authenticated" });
    }
};

const verifyTokenAndUserAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userId === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(401).json({
                message: "You're not authenticated",
            });
        }
    });
};
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(401).json({
                message: "You're not authenticated",
            });
        }
    });
};
module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndUserAuthorization,
};
