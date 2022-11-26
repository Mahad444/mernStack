const joi = require('joi');

const waiterSchema = joi.object({
    pass:joi.string().min(8).max(8).required(),
    Name:joi.string().required()
});

module.exports = waiterSchema;