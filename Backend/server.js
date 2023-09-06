import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


const app = express();


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended : true})); 

import authRoutes from './routes/authRoutes.js';
app.use('/auth' , authRoutes);

import userRoutes from './routes/user.js';
app.use('/' , userRoutes);


import { connectDB } from './connection/databse.js';
connectDB();


const port = process.env.PORT || 3000;
app.listen(port , () => {
    console.log(`server on http://localhost:${port}`);
})
