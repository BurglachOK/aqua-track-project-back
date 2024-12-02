import Joi from 'joi';
import { DATE_REGEX, MONTH_REGEX } from '../constants/index.js';

const dateRegex = /^((0[1-9]|[1-2][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4})$/;
const timeRegex = /^(?:2[0-4]|[01]?\d):(?:[0-5]\d)$/;

export const createWaterVolumeSchema = Joi.object({
  volume: Joi.number().positive().integer(),
  date: Joi.string()
    .required()
    .pattern(dateRegex)
    .message('Date must be dd.mm.yyyy / Where dd: 01-31, mm: 01-12'),
  time: Joi.string()
    .required()
    .pattern(timeRegex)
    .message('Time must be hh:mm / Where hh: 00-24, mm: 00-59'),
}).options({ abortEarly: false });

export const updateWaterVolumeSchema = Joi.object({
  volume: Joi.number().positive().integer(),
  date: Joi.string()
    .pattern(dateRegex)
    .message('Date must be dd.mm.yyyy / Where dd: 01-31, mm: 01-12'),
  time: Joi.string()
    .pattern(timeRegex)
    .message('Time must be hh:mm / Where hh: 00-24, mm: 00-59'),
}).options({ abortEarly: false });


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
