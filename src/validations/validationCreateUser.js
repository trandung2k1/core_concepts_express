const validationCreateUser = {
    firstName: {
        // isLength: {
        //     options: {
        //         min: 5,
        //         max: 32,
        //     },
        //     errorMessage: 'Username must be at least 5 characters with a max of 32 characters',
        // },
        notEmpty: {
            errorMessage: 'FirstName cannot be empty',
        },
        isString: {
            errorMessage: 'FirstName must be a string!',
        },
    },
    lastName: {
        notEmpty: {
            errorMessage: 'LastName cannot be empty',
        },
        isString: {
            errorMessage: 'LastName must be a string!',
        },
    },
    email: {
        notEmpty: true,
        matches: {
            options: /@(gmail)\.com$/i,
            errorMessage: 'You may only use email addresses from gmail',
        },
    },
    password: {
        notEmpty: true,
        matches: {
            options:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            errorMessage:
                'Password must have at least 8 characters including 1 uppercase letter, 1 lowercase letter, 1 special character',
        },
    },
    avatarUrl: {
        notEmpty: false,
    },
};
module.exports = validationCreateUser;
