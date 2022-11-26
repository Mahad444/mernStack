const joi = require('joi')


const choiceSchema =joi.object({
    foodType: joi.string().required(),
    quantity: joi.string().required(),
    drinkType:joi.string().required()
})

module.exports = choiceSchema;