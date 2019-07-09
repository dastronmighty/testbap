const Joi = require('@hapi/joi');
const faker = require('faker');
const blf = require('bad-words');
const filter = new blf();

module.exports = {
    validateRegister: (user) => {
        const schema = Joi.object().keys({
            email: Joi.string().min(7).required().email(),
            password: Joi.string().min(6).required(),
            affiliateCode: Joi.string().min(8).required()
        });
        const {
            error
        } = Joi.validate(user, schema);
        if (error) {
            return true;
        }
        return false;
    },
    loginValidation: (user) => {
        const schema = Joi.object().keys({
            email: Joi.string().min(7).required().email(),
            password: Joi.string().min(6).required()
        });
        const {
            error
        } = Joi.validate(user, schema);
        if (error) {
            return true;
        }
        return false;
    },
    createCode: (code) => {
        let timeInMS = new Date().getTime().toString();
        let shortenedMS = timeInMS.substring((timeInMS.length - 6), timeInMS.length);
        if (filter.isProfane(code)) {
            return `${shortenedMS}-${faker.internet.password(5)}`;
        }
        return `${shortenedMS}-${code}`;
    },
    createPassword: () => {
        let timeInMS = new Date().getTime().toString();
        let shortenedMS = timeInMS.substring((timeInMS.length - 12), timeInMS.length);
        return `${shortenedMS}-${faker.internet.password(10)}`;
    }
}