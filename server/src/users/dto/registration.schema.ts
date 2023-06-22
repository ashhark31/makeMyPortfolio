import * as joi from 'joi';
// const myCustomJoi = joi.extend(require('joi-phone-number'))

export const RegistrationSchema = joi.object({
    interest: joi.string().required(),
    email: joi.string().email().required(),
    title: joi.string().required(),
    firstName: joi.string().required(),
    middleName: joi.string().empty(''),
    lastName: joi.string().required(),
    mobile: joi.string().required(),
    birth: joi.date().required(),
    skills: joi.array().items(joi.string()).optional(),
    country: joi.string().required(),
    state: joi.string().required(),
    city: joi.string().required(),
    password: joi.string().required()
})