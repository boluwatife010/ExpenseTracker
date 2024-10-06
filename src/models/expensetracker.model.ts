import mongoose from 'mongoose';
import { expenseRequestBody } from '../interfaces/expenses';
const Schema = mongoose.Schema;
const expenseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    groceries : {
        type: String
    },
    leisure: {
        type: String
    },
    electronics : {
        type: String
    },
    utilities: {
        type: String
    },
    clothing: {
        type: String
    },
    health: {
        type: String
    },
    other: {
        type: String
    }
},
{timestamps: true})
export const expenseTrackerModel = mongoose.model<expenseRequestBody>('expense', expenseSchema)