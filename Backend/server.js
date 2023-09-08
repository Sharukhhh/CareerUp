import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({extended : true})); 

//user auth routes
import authRoutes from './routes/authRoutes.js'; 
app.use('/auth' , authRoutes);

//user routes
import userRoutes from './routes/user.js';
app.use('/' , userRoutes);

//admin routes
import adminRoutes from './routes/admin.js'
app.use('/admin' , adminRoutes);


import { connectDB } from './connection/databse.js';
connectDB();


const port = process.env.PORT || 3000;
app.listen(port , () => {
    console.log(`server on http://localhost:${port}`);
})
