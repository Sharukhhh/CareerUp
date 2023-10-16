import userModel from "../../models/userModel.js";
import companyModel from "../../models/companyModel.js";
import notifyModel from "../../models/notificationModel.js";
import chatModel from "../../models/chatsModel.js";


export const submitMessage = async (req, res, next) => {
    try {
        const user = req.user;
        const {inputMessage , recieverId} = req.body;

        console.log(inputMessage , recieverId );

        if(!inputMessage || !recieverId){
            return res.status(400).json({error : 'Invalid'});
        }

        const chat = await chatModel.findOneAndUpdate(
            {
                $or : [
                    {participants : [ user._id , recieverId ]},
                    {participants : [ recieverId , user._id ]}
                ]
            },

            {$setOnInsert : {participants : [user._id , recieverId] , messages : []}},

            {upsert : true , new : true},
        )

        if(!chat){
            return res.status(404).json({error : 'Not found'});
        }

        const message = {
            sender : user._id,
            message : inputMessage,
        }

        chat.messages.push(message);
        await chat.save();

        return res.status(200).json({message : 'Messsage sent' , chat});

    } catch (error) {
        next(error);
    }
} 


export const showAllMessages = async (req, res, next) => {
    try {
        const user = req.user;
        const id = req.params.recieverId;

        //finding chats of loggined user and reciever
        const chat = await chatModel.findOne({
            participants : {$all : [user._id , id]},
        }).populate('messages.sender' , 'name profileImage').exec();

        if(!chat){
            return res.status(404).json({message : 'chat not found'});
        }

        const messagesWithSenders = chat.messages.map(message => ({
            message: message.message,
            sender: {
                name: message.sender.name,
                profileImage: message.sender.profileImage
            },
            created: message.created
        }));

        return res.status(200).json({message : 'success', messages : messagesWithSenders});

    } catch (error) {
        next(error);
    }
}