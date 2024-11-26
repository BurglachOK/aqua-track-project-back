import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    name: { type: String, default: '' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, default: 'male' },
    weight: { type: Number, default: 0 },
    activeTime: { type: Number },
    dailyNorm: { type: Number },
    avatar: { type: String, default: 'none' },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UserCollection = model('users', usersSchema);
