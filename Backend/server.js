import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import nocache from 'nocache';
import morgan from 'morgan';
import path ,{ dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth/authRoutes.js'; 
import userRoutes from './routes/user/user.js'; 
import userDataRoutes from './routes/user/userData.js'
import chatRoutes from './routes/user/chatRoutes.js';
import adminRoutes from './routes/admin/admin.js'
import { errorHandler } from './middlewares/errorHandler.js';
import { connectDB } from './connection/databse.js';
import {Server as SocketIoServer} from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express(); 
const server = http.createServer(app);  
const io = new SocketIoServer(server , {
    cors : {
        origin: "https://careerup.website",
        methods: ["GET", "POST"],
        credentials : true
    }
});

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://careerup.website",
        "http://localhost:3000"
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));
app.use(nocache());
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname,"../Frontend/dist")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname,"../Frontend/dist/index.html"));
});

app.use(express.static('Backend/public/resumes')); 
app.use(express.json()); 
app.use(express.urlencoded({extended : true})); 

//user auth routes
app.use('/auth' , authRoutes);

//user routes
app.use('/' , userRoutes);

//user-data routes
app.use('/' , userDataRoutes);

//chat routes
app.use('/' , chatRoutes);

//admin routes
app.use('/admin' , adminRoutes);


app.use(errorHandler); 

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

        // console.log(chat , 'ith chat');

        if(!chat.participants){
            // console.log('no participants');
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
