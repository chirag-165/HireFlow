import express from 'express';
import proxyRoutes from './routes/proxyRoutes.js'
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173', 
  'https://hire-flow-gules.vercel.app' // Add your production frontend here
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());
app.use('/api',proxyRoutes);


app.listen(process.env.PORT,()=>{
    console.log("Gateway Running on port " + process.env.PORT);
})