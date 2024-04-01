const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const {
    checkSchema,
    validationResult,
    matchedData,
} = require('express-validator');
const validationCreateUser = require('../validations/validationCreateUser');
const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: The user firstName
 *         lastName:
 *           type: string
 *           description: The user lastName
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *         googleId:
 *           type: string
 *           description: The user googleId
 *       example:
 *          id: 65d77c4d36cab57154a4da54
 *          firstName: Tran
 *          lastName: Dung
 *          email: trandungksnb00@gmail.com
 *          password: Trandung123@
 */
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User api documentation
 */
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Return all user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Get all user successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.get('/', UserController.findAll);
router.post('/', checkSchema(validationCreateUser), function (req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send(result.array());
    const data = matchedData(req);
    console.log(data);
    return res.send('success');
});
module.exports = router;
