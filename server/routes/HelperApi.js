"use strict";

const rp = require('request-promise');

const prefix = "/api/helper"
const baseUrl = 'https://www.google.com/recaptcha/api/siteverify?'
const secret = 'secret=<YOUR SECRET>'

module.exports = (app) => {

    app.post(`${prefix}/recaptcha`, (request, response) => {


        const verifyUrl = baseUrl + secret + '&response=' + request.body.recaptchaResponse;
        var options = {
            method: 'POST',
            uri: verifyUrl
        };

        rp(options)
            .then((data) => {
                response.status(200).send(data)
            })
            .catch((error) => {
                console.log(error);
                response.status(500).json({
                    ok: false
                })
            });
    });

}
