import Joi from 'joi';
import {
  DATE_AND_TIME_REGEX,
  DATE_REGEX,
  MONTH_REGEX,
} from '../constants/index.js';

// const dateRegex = /^((0[1-9]|[1-2][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4})$/;
// const timeRegex = /^(?:2[0-4]|[01]?\d):(?:[0-5]\d)$/;

export const createWaterVolumeSchema = Joi.object({
  volume: Joi.number().integer().required().min(1).max(5000).messages({
    'number.base': 'Amount should be a number',
    'number.min': 'Amount should be at least 1 ml',
    'number.max': 'Amount should be at most 5000 ml',
    'any.required': 'Amount is required',
  }),
  date: Joi.string().required().pattern(DATE_AND_TIME_REGEX).messages({
    'required.base': 'Date required',
    'string.pattern.base':
      'Date and time should exist in a year range 2020 to 2099 and match format YYYY-MM-DD HH:MM For example 2024-02-29 07:54',
  }),
});
//   volume: Joi.number().positive().integer(),
//   date: Joi.string()
//     .required()
//     .pattern(dateRegex)
//     .message('Date must be dd.mm.yyyy / Where dd: 01-31, mm: 01-12'),
//   time: Joi.string()
//     .required()
//     .pattern(timeRegex)
//     .message('Time must be hh:mm / Where hh: 00-24, mm: 00-59'),
// }).options({ abortEarly: false });

export const updateWaterVolumeSchema = Joi.object({
  volume: Joi.number().integer().min(1).max(5000).messages({
    'number.base': 'Amount should be a number',
    'number.min': 'Amount should be at least 1 ml',
    'number.max': 'Amount should be at most 5000 ml',
  }),
  date: Joi.string().pattern(DATE_AND_TIME_REGEX).messages({
    'string.pattern.base':
      'Date and time should exist in a year range 2020 to 2099 and match format YYYY-MM-DD HH:MM For example 2024-02-29 07:54',
  }),
})
  .min(1)
  .messages({
    'object.min': 'At least one field is required for update',
  });
//   volume: Joi.number().positive().integer(),
//   date: Joi.string()
//     .pattern(dateRegex)
//     .message('Date must be dd.mm.yyyy / Where dd: 01-31, mm: 01-12'),
//   time: Joi.string()
//     .pattern(timeRegex)
//     .message('Time must be hh:mm / Where hh: 00-24, mm: 00-59'),
// }).options({ abortEarly: false });

export const searchByDayCardSchema = Joi.object({
  date: Joi.string().pattern(DATE_REGEX).messages({
    'string.pattern.base':
      'Date should exist in a year range 2020 to 2099. For example 2024-12-02',
  }),
});

export const searchByMonthCardSchema = Joi.object({
  date: Joi.string().pattern(MONTH_REGEX).messages({
    'string.pattern.base':
      'Date should exist in a year range 2020 to 2099. For example 2024-02',
  }),
});
