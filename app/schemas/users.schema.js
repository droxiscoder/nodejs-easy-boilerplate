const Joi = require('joi');

const name = Joi.string().regex(/^[a-zA-Z]+$/);
const stringVal = Joi.string().required();

const usersSchema = Joi.object({
    user_id: Joi.number().integer().allow(null).optional(),
    first_name: name.required(),
    last_name: name.required(),
    email: Joi.string().email().required(),
    phone_number: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    is_active: Joi.bool().optional(),
    address: stringVal,
    city: stringVal,
    state: stringVal
});

module.exports = usersSchema;