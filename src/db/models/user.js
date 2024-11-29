import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String },
    weight: { type: Number },
    activeTime: { type: Number },
    dailyNorm: { type: Number },
    avatar: { type: String },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },

    verifyEmail: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
};
export const UserCollection = model('users', usersSchema);
