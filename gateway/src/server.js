import express from 'express';
import proxyRoutes from './routes/proxyRoutes.js'
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config();

const app = express();

// Remove the strict allowedOrigins array and use a regex pattern instead
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the origin is localhost OR if it ends with vercel.app
    if (origin === 'http://localhost:5173' || origin.endsWith('vercel.app')) {
      return callback(null, true);
    } else {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
  },
  credentials: true // Important if you are using cookies/sessions
}));

app.use(express.json());
app.use('/api',proxyRoutes);

app.get('/test', (req, res) => res.send('Server is up!'));

app.listen(process.env.PORT,()=>{
    console.log("Gateway Running on port " + process.env.PORT);
})