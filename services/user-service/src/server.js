import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {connectDB} from './config/db.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/auth',authRoutes);

app.get('/',(req,res) =>{
    res.send("User Service Running");
})

app.listen(process.env.PORT,()=>{
    console.log(`User Service running on ${process.env.PORT}`);
});