import Joi from 'joi';

const userSchema = Joi.object({
  firstName: Joi.string().required().messages({
    'string.base': 'First name should be a string',
    'any.required': 'First name is required',
  }),
  lastName: Joi.string().required().messages({
    'string.base': 'Last name should be a string',
    'any.required': 'Last name is required',
  }),
  gender: Joi.string().required().messages({
    'string.base': 'Gender should be a string',
    'any.required': 'Gender is required',
  }),
  age: Joi.number().required().messages({
    'number.base': 'Age should be a number',
    'any.required': 'Age is required',
  }),
  dateOfBirth: Joi.string().required().messages({
    'string.base': 'Date of birth should be a string',
    'any.required': 'Date of birth is required',
  }),
  maritalStatus: Joi.string()
    .valid('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED')
    .default(null)
    .messages({
      'string.base': 'Marital status should be a string',
      'any.only': 'Invalid marital status',
    }),
  nationality: Joi.string().required().messages({
    'string.base': 'Nationality should be a string',
    'any.required': 'Nationality is required',
  }),
  email: Joi.string().required().email().messages({
    'string.base': 'Email should be a string',
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password should be a string',
    'any.required': 'Password is required',
  }),
});

export default userSchema;
