import { model, Schema } from 'mongoose';
// import { localDate, localTime } from '../../services/water.js';
import { DATE_AND_TIME_REGEX } from '../../constants/index.js';

function validator(date) {
  return DATE_AND_TIME_REGEX.test(date);
}

const waterSchema = new Schema(
  {
    volume: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    date: {
      type: String,
      // default: () => localDate(),
      validate: validator,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const WaterCollection = model('water', waterSchema);
