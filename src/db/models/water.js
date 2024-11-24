
import { model, Schema } from 'mongoose';

const waterSchema = new Schema(
    {
        amount: { type: Number, required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'users' },
        date: { type: Date, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const WaterCollection = model('water', waterSchema);
