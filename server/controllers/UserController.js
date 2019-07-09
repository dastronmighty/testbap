const User = require('../Models/UserModel');
const authHelper = require('../functions/authHelpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    addUser: async (request, response) => {
        let user = {
            email: request.body.email,
            password: authHelper.createPassword(),
            affiliateCode: authHelper.createCode(request.body.code)
        };

        if (authHelper.validateRegister(user)) {
            return response.status(500).json({
                ok: false,
                error: "invalid user"
            });
        }
        const email = await User.findOne({
            email: user.email
        });
        if (email) {
            return response.status(500).json({
                ok: false,
                error: "email already in system"
            });
        }

        console.log(user.password);


        const salt = await bcrypt.genSalt(11);
        const hashPassword = await bcrypt.hash(user.password, salt);

        user.password = hashPassword;

        user = new User(user);
        user.save()
            .then(user => {
                return response.status(200).json({
                    ok: true,
                    user: user
                });
            })
            .catch(error => {
                return response.status(500).json({
                    ok: false,
                    error: error
                });
            });

    },
    login: async (request, response) => {
        let reqUser = {
            email: request.body.email,
            password: request.body.password,
        };
        if (authHelper.loginValidation(reqUser)) {
            return response.status(500).json({
                ok: false,
                error: "invalid user"
            });
        }

        const user = await User.findOne({
            email: reqUser.email
        });
        if (!user) {
            return response.status(500).json({
                ok: false,
                error: "invalid email or password"
            });
        }

        const validPass = await bcrypt.compare(reqUser.password, user.password);


        if (!validPass) {
            return response.status(500).json({
                ok: false,
                error: "invalid email or password"
            });
        }

        return response.status(200).json({
            ok: true,
            code: user.affiliateCode
        });

    },
    addUserQ: async (request, response) => {
        let user = {
            email: request.body.email,
            password: request.body.password,
            affiliateCode: request.body.code
        };

        const salt = await bcrypt.genSalt(11);
        const hashPassword = await bcrypt.hash(user.password, salt);

        user.password = hashPassword;

        user = new User(user);
        user.save()
            .then(user => {
                return response.status(200).json({
                    ok: true,
                    user: user
                });
            })
            .catch(error => {
                return response.status(500).json({
                    ok: false,
                    error: error
                });
            });

    }
}