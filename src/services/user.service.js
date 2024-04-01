const APIfeatures = require('../lib/features');
const User = require('../models/user.model');
class UserService {
    static async findAll(query) {
        // const promise = new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         reject({
        //             message: 'Internal error',
        //         });
        //     }, 300);
        // });
        // return promise;
        // const findAllUser = await User.find();

        const features = new APIfeatures(User.find().select('-password'), query)
            .panigating()
            .sorting()
            .searching()
            .filtering();

        const result = await Promise.allSettled([
            features.query,
            User.countDocuments(),
        ]);
        const users = result[0].status === 'fulfilled' ? result[0].value : [];
        const count = result[1].status === 'fulfilled' ? result[1].value : 0;
        const limit = Number(query.limit);
        const data = await User.find({});
        const length = data.length;
        const page = (length / limit) | 1;
        return { users, count, page };
    }
}
module.exports = UserService;
