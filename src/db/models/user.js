import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        gender: { type: String, required: true },
        weight: { type: Number, required: true },
        activeTime: { type: Number, required: true },
        dailyNorm: { type: Number, required: true },
        avatar: { type: String },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },
    },
    { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};


export const UserCollection = model('users', usersSchema);
