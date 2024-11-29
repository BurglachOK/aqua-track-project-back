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
  weight: Joi.number().required(),
  activeTime: Joi.number().required(),
  dailyNorm: Joi.number().required(),
  // email: Joi.string().email().required(),
  // password: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  // .pattern(/^[a-zA-Z ]+$/)
  //   .messages({
  //     'string.pattern.base': 'Name can only contain letters',
  //   }),
  password: Joi.string(),
  // непотрібне поле
  email: Joi.string().email(),
  // .pattern(emailRegexp).messages({
  //   'string.email': 'Email must be a valid email address',
  // }),
  // Потрібно emailRegexp імпортувати сюди з констант.індекс жс. А до цього створити його там
  gender: Joi.string().valid('male', 'female', 'other'),
  weight: Joi.number(),
  // .min(10).max(250).messages({
  //   'number.min': 'Weight should be at least 10 kg',
  //   'number.max': 'Weight should not exceed 250 kg',
  // }),
  activeTime: Joi.number(),
  // .min(0).messages({
  //   'number.min': 'Daily activity time cannot be a negative number',
  // }),
  dailyNorm: Joi.number(),
  // .min(0).messages({
  //   'number.min': 'Daily water norm cannot be a negative number',
  // }),
  // avatar: Joi.binary(),
}).min(1);
// .min(1); - не впевнений що потрібно

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
