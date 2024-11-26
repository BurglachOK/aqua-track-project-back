import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base':
      'Username should be a written only with letters, not numbers or other stuff',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  weight: Joi.number().min(1).max(500).required(),
  activeTime: Joi.number().required(),
  dailyNorm: Joi.number().required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  password: Joi.string(),
  email: Joi.string().email(),
  gender: Joi.string().valid('male', 'female', 'other'),
  weight: Joi.number().min(1).max(500),
  activeTime: Joi.number(),
  dailyNorm: Joi.number(),
}).min(1);

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});

export const confirmOAuthSchema = Joi.object({
  code: Joi.string().required(),
});
