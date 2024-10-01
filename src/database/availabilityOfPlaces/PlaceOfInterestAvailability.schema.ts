import { Schema } from "mongoose";

export const AvailabilityOfPlaceOfInterestSchema = new Schema({
    id: { type: String, unique: true },
    active: { type: Boolean, require: true },
    host: String,
    coda_view_id: String,
    rowID: Number, 
    proxSeisMeses: Number,
    meses: [{
        año: Number,
        mes: Number,
        porcentajeDisponibilidad: Number,
        fechas: [{
            dia: String,
            fecha: String,
            disponible: Boolean,
            disponibleParaCheckin: Boolean,
        }]
    }]
}, { timestamps: true });