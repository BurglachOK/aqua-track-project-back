import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    name: { type: String, default: 'User' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, default: 'female' },
    weight: { type: Number },
    activeTime: { type: Number },
    dailyNorm: { type: Number },
    avatar: { type: String, default: 'https://res.cloudinary.com/dfsy8w2ey/image/upload/v1733000750/fgag3jpord5egbrmc1ns.jpg' },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    verifyEmail: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
export const UserCollection = model('users', usersSchema);
