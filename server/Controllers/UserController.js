
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
            if (!email) throw { name: "EmailBadRequest"};
            if (!password) throw { name: "PasswordBadRequest"};
            
            const data = await User.findOne({ where: { email } });
            if (!data) { throw { name: "Unauthorized"}}
            
            const validPassword = comparePassword(password, data.password);

            if (!validPassword) throw { name: "Unauthorized"};

            const access_token = signToken({ id: data.id });

            res.status(201).json({ token: access_token });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController