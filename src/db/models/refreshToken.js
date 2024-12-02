import { model, Schema } from 'mongoose';

const tokenSchema = new Schema({
    token: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    expiresAt: { type: Date, required: true },
});

export const Token = model('Token', tokenSchema);
