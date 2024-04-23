
const { comparePassword } = require("../helpers/bycript");
const { signToken } = require("../helpers/jwt")

const { User } = require("../models");
const CLIENT_ID = '6fb79fdd2437be1ef4e3'
const CLIENT_SECRET = '21785dfd613d5b3e9cca84efada23df33f793c10'
class UserController {
    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body;
            const user = await User.create({
                username,
                email,
                password
            });
            const responseData = {
                username: user.username,
                email: user.email,
                password: user.password
            };
            res.status(201).json(responseData);
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Email must be unique" });
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
    static async githubLogin(req, res, next) {
        try {
            req.query.code;

            const params =
                "?client_id=" +
                CLIENT_ID +
                "&client_secret=" +
                CLIENT_SECRET +
                "&code=" +
                req.query.code +
                "&scope=user:mail";

            const { data } = await axios({
                url: "https://github.com/login/oauth/access_token" + params,
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
            });
            // console.log(data);
        } catch (error) {
            console.log(error);
            // next(error);
        }
    }
}

module.exports = UserController