const transport = require('./transportMail');
transport.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Ready for message');
        console.log(success);
    }
});
