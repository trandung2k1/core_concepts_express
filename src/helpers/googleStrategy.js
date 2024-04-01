const passportGoogle = require('passport-google-oauth20');
const User = require('../models/user.model');
const GoogleStrategy = passportGoogle.Strategy;
const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/auth/google/callback',
        passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
        if (profile && profile.id) {
            User.findOne({ email: profile.emails[0].value }).then(
                async (existingUser) => {
                    if (existingUser) {
                        // update info user
                        if (!existingUser.googleId) {
                            const updatedUser = await User.updateOne(
                                {
                                    email: profile.emails[0].value,
                                },
                                {
                                    googleId: profile.id,
                                    avatarUrl: profile?.photos[0]?.value,
                                },
                                {
                                    new: true,
                                },
                            );
                            const { password, refreshToken, ...info } =
                                updatedUser['_doc'];
                            return done(null, info);
                        }
                        return done(null, existingUser);
                    } else {
                        const newUser = new User({
                            googleId: profile.id,
                            email: profile?.emails[0]?.value,
                            firstName: profile?.name?.givenName,
                            lastName: profile?.name?.familyName,
                            avatarUrl: profile?.photos[0]?.value,
                            isVerified: profile?.emails[0]?.verified,
                        });
                        newUser.save().then((user) => {
                            delete user.password;
                            done(null, user);
                        });
                    }
                },
            );
        }
    },
);
module.exports = googleStrategy;
