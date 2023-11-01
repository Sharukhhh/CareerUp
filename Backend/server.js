import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import {Server as SocketIoServer} from 'socket.io';
import http from 'http';
import path from 'path';


const app = express(); 
const server = http.createServer(app);  
const io = new SocketIoServer(server , {
    cors : {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials : true
    }
});

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));

app.use(express.static('Backend/public/resumes')); 
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

//chat routes
import chatRoutes from './routes/user/chatRoutes.js';
app.use('/' , chatRoutes);

//admin routes
import adminRoutes from './routes/admin/admin.js'
app.use('/admin' , adminRoutes);

import { errorHandler } from './middlewares/errorHandler.js';
app.use(errorHandler); 

import { connectDB } from './connection/databse.js';
connectDB();


io.on('connection' , (socket) => {
    console.log('connected');

    //chat related events starting
    socket.on('start' , (userData) => { 
        socket.join(userData);   //starting a chat
        console.log(userData , 'ith login userinte id');
    });

    socket.on('join chat' , (chatRoom) => {
        socket.join(chatRoom);
        console.log('joined the room' , chatRoom);

    })

    socket.on('new chat message' , (message) => {
        const chat = message.chat;

        console.log(chat , 'ith chat');

        if(!chat.participants){
            console.log('no participants');
        }
        chat.participants.forEach((user) => {
            if(user._id === message.sender._id){

            }

            return socket.in(user._id).emit('message recieved' , message);
        })
    });

    socket.on('disconnect' , () => {
        // console.log('disconnected');
    });
})


const port = process.env.PORT || 3000;
server.listen(port , () => {
    console.log(`server on http://localhost:${port}`);
})
