
const { comparePassword } = require("../helpers/bycript");
const {signToken} = require("../helpers/jwt")

const { User } = require("../models");

class UserController {
    static async register(req, res, next) {
        try {
            const { username,email, password } = req.body;
            const user = await User.create({
                username,
                email,
                password
            });
            const responseData = {
                username:user.username,
                email: user.email,
                password: user.password
            };
            res.status(201).json(responseData);
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email) throw { name: "BadRequest", msg: "email must be exist" };
            if (!password)
                throw { name: "BadRequest", msg: "password must be exist" };
            const data = await User.findOne({ where: { email } });
            if (!data) {
                throw { name: "unauthorized", msg: "email/password invalid" };
            }
            const validPassword = comparePassword(password, data.password);

            if (!validPassword)
                throw { name: "unauthorized", msg: "email/password invalid" };
            const access_token = signToken({ id: data.id });
            res.status(201).json({ token: access_token });
        } catch (error) {
            res.status(401).json({ message: "Invalid email/password" });
        }
    }
}

module.exports = UserController