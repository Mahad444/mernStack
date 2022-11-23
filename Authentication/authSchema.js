const joi = require('joi');

const authSchema = joi.object({
    firstName:joi.string().required(),
    lastName:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().min(6).required(),
    phoneNumber:joi.string().min(10).required()
});
const choiceSchema =joi.object({
    foodType: joi.string().required(),
    quantity: joi.string().required(),
    drinkType:joi.string().required()
})

module.exports = authSchema , choiceSchema;