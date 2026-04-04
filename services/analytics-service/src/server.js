import express from 'express'
import dotenv from 'dotenv'
import analyticRoute from './routes/analyticRoute.js'
import cors from 'cors'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/analytics',analyticRoute);

app.listen(process.env.PORT,()=>{
    console.log(`🔐 User Service is running on http://127.0.0.1:${process.env.PORT}`);
})