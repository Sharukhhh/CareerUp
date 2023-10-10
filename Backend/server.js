import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import {Server as SocketIoServer} from 'socket.io';
import http from 'http';


const app = express(); 
const server = http.createServer(app);  
const io = new SocketIoServer(server);

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));

app.use(express.json()); 
app.use(express.urlencoded({extended : true})); 

//user auth routes
import authRoutes from './routes/auth/authRoutes.js'; 
app.use('/auth' , authRoutes);

//user routes
import userRoutes from './routes/user/user.js';
app.use('/' , userRoutes);

//user-data routes
import userDataRoutes from './routes/user/userData.js'
app.use('/' , userDataRoutes);

//admin routes
import adminRoutes from './routes/admin/admin.js'
app.use('/admin' , adminRoutes);

import { errorHandler } from './middlewares/errorHandler.js';
app.use(errorHandler); 

import { connectDB } from './connection/databse.js';
connectDB();


const port = process.env.PORT || 3000;
server.listen(port , () => {
    console.log(`server on http://localhost:${port}`);
})
