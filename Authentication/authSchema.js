const joi = require('joi');

const authSchema = joi.object({
    firstName:joi.string().required(),
    lastName:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().min(6).required(),
    phoneNumber:joi.string().min(10).required()
});

module.exports = authSchema;