import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './src/routes/user.route'
const app = express()
app.use(bodyParser.json())
app.use('/user', userRouter)
app.listen (3000, async () => {
    console.log('Successfully connected to port 3000 :)')
})