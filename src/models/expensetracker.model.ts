import mongoose from 'mongoose';
import { expenseRequestBody, validCategories } from '../interfaces/expenses';
const Schema = mongoose.Schema;
const expenseSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: [0, 'Amount must be a positive number']
    },
  categories: {
    type: String,
    required: true,
    enum: Object.values(validCategories)
  },
  id : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  }
},
{timestamps: true})
export const expenseTrackerModel = mongoose.model<expenseRequestBody>('expense', expenseSchema)