import mongoose, { Schema } from "mongoose";
import { MODELS } from './models.js';


const productSchema = new Schema (
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        tags: {
            type: [String],
            trim: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: MODELS.USER,
        }
    },
    {
        timestamps: true,
    }
);


export const Product = mongoose.models.Product || mongoose.model(MODELS.PRODUCT, productSchema);