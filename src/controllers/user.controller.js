const UserService = require('../services/user.service');
class UserController {
    static async findAll(req, res) {
        try {
            const find = await UserService.findAll(req.query);
            return res.status(200).json(find);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
module.exports = UserController;
