import { Schema } from "mongoose";

export const CodaViewUpdateDate = new Schema({
    last_date: { type: Date, require: true },
    coda_view_id: { type: String, require: true, unique: true },
    success: { type: Boolean, require: true }
}, { timestamps: true });