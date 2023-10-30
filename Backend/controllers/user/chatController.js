import userModel from "../../models/userModel.js";
import companyModel from "../../models/companyModel.js";
import notifyModel from "../../models/notificationModel.js";
import chatModel from "../../models/chatsModel.js";
import messsageModel from "../../models/chatMessage.js";


export const createGroupChat = async (req, res, next) => {
    try {
        const {participants} = req.body;

        const chat = await chatModel.findOne({
            participants : {$all: participants},
            isGroupChat : true
        });

        if(chat){
            return res.status(200).json({chatId : chat._id})
        }

        const newChat = new chatModel.create({
            participants,
            isGroupChat : true
        });

        if(!newChat){
            console.log('error');
            return;
        }

        await newChat.save();
        return res.status(200).json({chatId : newChat._id});

    } catch (error) {
        next(error);
    }
}

export const submitMessage = async (req, res, next) => {
    try {
        const user = req.user;
        const {content , chatId} = req.body;

        console.log(content , chatId , 'Labhichu' );

        if(!content || !chatId){
            return res.status(400).json({error : 'Invalid'});
        }

        let newMessage = {
            sender : user._id,
            chat : chatId,
            content  : content
        }

        let message = await messsageModel.create(newMessage);
        message = await message.populate('sender' , 'name profileImage');
        message = await message.populate('chat');
        message = await userModel.populate(message , {
            path : 'chat.participants',
            select : 'name profileImage'
        });

        await chatModel.findByIdAndUpdate(chatId , {
            lastMessage : message
        } , {new : true});

        return res.status(200).json({msg : 'Messsage sent' , message});

    } catch (error) {
        next(error);
    }
} 


export const showAllMessages = async (req, res, next) => {
    try {
        const user = req.user;
        const chatId =req.params.chatId;

        const message = await messsageModel.find({chat : chatId})
        .populate('sender' , 'name profileImage')
        .populate('chat');

        if(!message){
            return;
        }

        res.status(200).json({ message})

    } catch (error) {
        next(error);
    }
}