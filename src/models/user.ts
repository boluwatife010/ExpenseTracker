import mongoose from 'mongoose';
import validator from 'validator';
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username : {
        required: true,
        type: String
    },
    email: {
        type: String,
        required: true,
        isTrue: validator.isEmail
    },
    password: {
        type: String,
        required: true
    }
})
export const userModel = mongoose.model('User', userSchema)