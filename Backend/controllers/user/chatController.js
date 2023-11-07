import userModel from "../../models/userModel.js";
import companyModel from "../../models/companyModel.js";
import notifyModel from "../../models/notificationModel.js";
import chatModel from "../../models/chatsModel.js";
import messsageModel from "../../models/chatMessage.js";



export const findUserToChat = async (req, res, next) => {
    try {
        const {searchInput} = req.body;
        const user = req.user;

        if(!searchInput){
            return;
        }

        const searchResults = await userModel.find({
            name : {$regex : searchInput  , $options : 'i'},
            _id : {$ne : user._id},
        }).populate('name profileImage headline');
        
        if(!searchResults){
            return;
        }

        return res.status(200).json({message : 'success' , searchResults});

    } catch (error) {
        next(error);
    }
}


export const setupingChatWithSelectedUser = async (req, res ,next) => {
    try {
        const  {userId} = req.body;
        const user = req.user;

        if(!userId){
            return;
        }

        let chatExists = await chatModel.find({
            $and : [
                {participants : {$elemMatch : {$eq : userId}}},
                {participants : {$elemMatch : {$eq : user._id}}}
            ]
        })
        .populate('participants' , '-password')
        .populate('lastMessage')

        chatExists = await userModel.populate(chatExists , {
            path : 'lastMessage.sender',
            select : 'name profileImage'
        })

        if(!chatExists){
            return;
        }

        if(chatExists.length > 0){
            return res.status(201).json({chat : chatExists[0]});
        }

        let chatData = {
            chatName : 'sender',
            participants : [userId , user._id]
        };

        const newChat = await chatModel.create(chatData);

        if(!newChat){
            return;
        }

        const fullChat = await chatModel.findOne({_id: newChat._id}).populate('participants' , '-password');

        return res.status(201).json({chat : fullChat})

    } catch (error) {
        next(error);
    }
}


export const getCreatedChat = async (req, res, next) => {
    try {
        const user = req.user;
        chatModel.find({participants : {$elemMatch : {$eq : user._id}}})
        .populate('participants' , '-password')
        .populate('lastMessage')
        .sort({updatedAt : -1})
        .then(async(results) =>{
            results = await userModel.populate(results , {
                path : 'lastMessage.sender',
                select : 'name profileImage'
            })

            res.status(200).json({results})
        })
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


export const submitMessage = async (req, res, next) => {
    try {
        const user = req.user;
        const {content , chatId} = req.body;

        // console.log(content , chatId , 'Labhichu' );

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

        console.log(message);

        return res.status(200).json({msg : 'Messsage sent' , message});

    } catch (error) {
        next(error);
    }
} 


