import { Schema } from "mongoose";

export const PlaceSchema = new Schema({
    id: String,
    city: String,
    country: String,
});