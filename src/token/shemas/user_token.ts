import * as mongoose from 'mongoose';

export const TokenShema = new mongoose.Schema({
    token: { type: String, required: true},
    uId: {type: String, required: true, ref: 'User'},
    expireAt: {type: Date, required: true}
})

TokenShema.index({ token: 1, uId: 1 }, { unique: true });