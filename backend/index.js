
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
import chatRoutes from './routes/chat.route.js'
import aiRoutes from './routes/ai.route.js'

import connectDB from './db/db.js';  

import path from "path"

const app = express();

const PORT = process.env.PORT || 8000;


app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true  
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const __dirname = path.resolve();


app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/health',healthRoute);
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/post',postRoutes)
app.use('/api/v1/test',testRoutes)
app.use('/api/v1/chat',chatRoutes)
app.use('/api/v1/ai',aiRoutes)


if(process.env.NODE_ENV.trim() === "production"){
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname, "frontend", "dist" , "index.html"));
  })
}

app.listen(PORT,()=>{
    connectDB();
    console.log(`server listning at ${PORT}`);
    
})




