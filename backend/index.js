
import express  from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
dotenv.config();

//routes
import authRoutes from './routes/auth.routes.js'
import  healthRoute  from './routes/healthcheck.route.js';
import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/post.routes.js'
import testRoutes from './routes/test.route.js'

import connectDB from './db/db.js';

const app = express();

const PORT = process.env.PORT;


app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true  
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/health',healthRoute);
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/post',postRoutes)
app.use('/api/v1/test',testRoutes)

app.listen(PORT,()=>{
    connectDB();
    console.log(`server listning at ${PORT}`);
    
})




