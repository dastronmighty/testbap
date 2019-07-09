const jwt = require('jsonwebtoken');
const config = require('../server.config');


module.exports = {
    auth: (request, response, next) => {
        const token = request.header('auth-token');
        if (!token) {
            return response.status(401).send({
                ok: false,
                error: "Access Denied"
            });
        }

        try {
            const verified = jwt.verify(token, config.TOKEN_SECRET);
            request.user = verified;
            next();
        } catch (error) {
            response.status(400).json({
                ok: false,
                error: "Invalid Token"
            })
        }

    }
}