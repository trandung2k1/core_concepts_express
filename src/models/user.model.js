const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            trim: true,
        },
        googleId: {
            type: String,
            trim: true,
        },
        avatarUrl: {
            type: String,
            trim: true,
            default:
                'https://res.cloudinary.com/deg3gxigl/image/upload/v1694483531/graduation_project/avatars/avatardefault_uyejyy.svg',
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        cart: {
            type: Schema.Types.ObjectId,
            ref: 'Cart',
        },
        addresses: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Address',
            },
        ],
    },
    {
        timestamps: true,
    },
);
userSchema.index({ email: 1 });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const user = this;
        const hashPassword = await bcrypt.hash(user.password, salt);
        user.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
