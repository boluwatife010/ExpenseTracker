import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './src/utils/db';
import userRouter from './src/routes/user.route'
const app = express()
connectDB();
app.use(bodyParser.json())
app.use('/user', userRouter)
app.listen (3000, async () => {
    console.log('Successfully connected to port 3000 :)')
})