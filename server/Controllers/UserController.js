
const { comparePassword } = require("../helpers/bycript");
const { signToken } = require("../helpers/jwt")
const axios = require("axios");
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
                
            };
            res.status(201).json(responseData);
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email) throw { name: "EmailBadRequest" };
            if (!password) throw { name: "PasswordBadRequest" };

            const data = await User.findOne({ where: { email } });
            if (!data) { throw { name: "Unauthorized" } }

            const validPassword = comparePassword(password, data.password);

            if (!validPassword) throw { name: "Unauthorized" };

            const access_token = signToken({ id: data.id });

            res.status(201).json({ token: access_token, email: data.email, username: data.username });
        } catch (error) {
            next(error);
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
            let payload = await axios({
                method: "get",
                url: "https://api.github.com/user",
                headers: {
                    Authorization: "Bearer " + data.access_token,
                },
            });
            // console.log(data);
            console.log(payload);
            const [user, created] = await User.findOrCreate({
                where: { email: `${payload.data.login}@mail.com` },
                defaults: {
                    username: payload.data.login,
                    email: `${payload.data.login}@mail.com`,
                    password: String(Math.random() * 10000),
                },
            });
            // console.log(user, created);
            const token = signToken({
                id: user.id,
            });
            res.status(200).json({ token, email: user.email, username: user.username });
        } catch (error) {
            console.log(error);
            // next(error);
        }
    }
}

module.exports = UserController