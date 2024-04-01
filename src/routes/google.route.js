const { Router } = require('express');
const passport = require('passport');
const redisClient = require('../configs/redis');
const router = Router();

router.get(
    '/google/callback',
    passport.authenticate('google'),
    async (req, res) => {
        try {
            const { ...info } = req.user['_doc'];
            const accessToken = generatedAccessToken({
                _id: info._id,
                isAdmin: info.isAdmin,
            });
            const refreshToken = generatedRefreshToken({
                _id: info._id,
                isAdmin: info.isAdmin,
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
                maxAge: 5 * 24 * 60 * 60 * 60,
            });
            await redisClient.set(info._id.toString(), refreshToken, {
                EX: 5 * 24 * 60 * 60,
            });
            return res.status(200).json({ ...info, accessToken });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
);
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    }),
);
module.exports = router;
