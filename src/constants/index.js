import path from 'node:path';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const emailRegexp = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

export const DATE_REGEX =
  /^(?:20[2-9]{2})-(?:(?:0[1-9]|1[0-2]))-(?:(?:0[1-9]|1[0-9]|2[0-8])|(?:29|30)(?=\-(?:0[13-9]|1[0-2]))|(?:31(?=\-(?:0[13578]|1[02])))|(?:29(?=\-02\-(?:(?:(?:[2468][048]|[3579][26])00)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26]))))))$/;

export const MONTH_REGEX = /^(?:20[2-9][0-9])-(?:(?:0[1-9]|1[0-2]))$/;

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
