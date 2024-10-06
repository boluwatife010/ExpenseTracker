import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL!)
        console.log('MongoDB successfully connected!')
    }   catch (err) {
        console.log('MongoDB failed to connect.', err)
        process.exit(1)
    }
}