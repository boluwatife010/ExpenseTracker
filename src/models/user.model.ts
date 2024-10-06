import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs'
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username : {
        required: true,
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        isTrue: validator.isEmail
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})
// Automatically hash passwords
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
userSchema.methods.compare = function (password: string): Promise<boolean> {
    return bcrypt.compare(this.password, password);
}
userSchema.pre('save', async function (next) {
    this.updatedAt =new Date();
next();
})
export const userModel = mongoose.model('User', userSchema)