import userModel from '../../models/userModel.js';
import companyModel from '../../models/companyModel.js'; 
import postModel from '../../models/posts.js';
import categoryModel from '../../models/category.js';
import jobModel from '../../models/jobs.js';
import notifyModel from '../../models/notificationModel.js';
import mongoose from 'mongoose';

export const ownProfile = async (req, res, next) => {
    try {
        
        const loggedUser = req.user;
        const user = await userModel.findById(loggedUser._id)
        .select('name headline profileImage connections education profession location savedPosts') // Only select the necessary fields
        .populate({
            path: 'connections.userId',
            select: 'name profileImage _id',
        })
        .populate({
            path: 'followingCompanies.company',
            select: 'name headline profileImage', 
        })
        .populate('savedPosts.postId')
        .exec();

        if(!user){
            const company = await companyModel.findById(loggedUser._id)
            .populate({
                path: 'followingCompanies.company',
                select: 'name headline profileImage', 
            })
            .populate({ 
                path : 'followers.user',
                select : 'name headline profileImage'
            })
            .populate({
                path : 'followers.company',
                select : 'name headline profileImage'
            })
            .populate('savedPosts.postId');

            if(!company){
                return res.status(400).json({error : 'No user'})
            }
            
            return res.status(200).json({message: 'success' , user : company});
        }

        
        res.status(200).json({message : 'success' , user});
        
    } catch (error) {
        next(error);
    }
}


export const getProfile = async (req, res , next) => {
    try {

        const id = req.params.id;

        const loggedUser = req.user;
        
        if(id){   
            const user = await userModel.findById(id)
            .select('name headline profileImage connections education profession location') 
            .populate({
                path: 'connections.userId',
                select: 'name profileImage _id',
            }).exec();
    
            // console.log(user , 'ith saadha user');
            
            if(!user){
                const company = await companyModel.findById(id).populate('followers')
                .populate('followingCompanies'); 
    
                if(!company){
                    return res.status(400).json({error : 'No user'})
                }
    
                // console.log(company , 'ith matte company');
                return res.status(200).json({message: 'success' , user : company});
            }
    
            res.status(200).json({message : 'success' , user})
        }
        
    } catch (error) {
        next(error);
    }
}

export const displayConnections = async (req, res, next) => {
    try {
        const user = req.user;

        const findUser = await userModel.findById(user._id)
        .populate('connections.userId')
        .populate('followingCompanies.company')
        .exec();
        
        if(!findUser){
            return res.status(404).json({error : 'Not found'});
        }

        return res.status(200).json({message : 'success', users : findUser});
    } catch (error) {
        next(error);
    }
}

// *********************************************************************************
// *********************************************************************************


export const listAllUsers = async (req, res , next) => {
    try {

        const loggedUser = req.user;

        const users = await userModel.find({_id :{$ne : loggedUser._id}}).populate('connections');

        if(!users || users.length === 0){
            return res.status(400).json({error : 'No users found'})
        }

        res.json({message : 'Success' , users});
        
    } catch (error) {
        next(error);
    }
}


export const listCompanies = async (req , res, next) => {
    try {
        const user = req.user;

        const companies = await companyModel.find({_id :{$ne : user?._id}});

        if(!companies || companies.length === 0){
            return res.status(400).json({error : 'No users found'})
        }

        res.json({message : 'success' , companies});

    } catch (error) {
        next(error);
    }
}


// *********************************************************************************
// *********************************************************************************

export const sendConnectionRequest = async (req, res, next) => {
    try {
        const id = req.params.userId;
        const user = req.user;

        if(!user){
            return res.status(404).json({error : 'No user found'});
        }

        if(user._id.equals(id)){
            return res.status(400).json({ error: 'You cannot connect with yourself' });
        }

        let targetUser = await userModel.findById(id);
        if(!targetUser){
            const targetCompany = await companyModel.findById(id);

            if(!targetCompany){
                return res.status(404).json({error : 'Company not found'});
            }

            targetUser = targetCompany;
        }

        if(!targetUser._id || !user._id){
            return res.status(400).json({error : 'Invalid user'});
        }

        const isConnected = user.connections.some((connection) => connection.userId.equals(targetUser._id))
        if(isConnected){
            return res.status(400).json({error : `Already connected with ${targetUser.name}`});
        }

        const requestExists = user.pendingRequests.some((reqst) => reqst.userId.equals(targetUser._id));
        if(requestExists){
            return res.status(400).json({ error: 'Connection request already sent' });
        }

        const checkRequestHasBeenSendByOtherUser = user.manageRequests.some((reqst) => reqst.userId.equals(targetUser._id));
        if(checkRequestHasBeenSendByOtherUser){
            return res.status(400).json({error : `${targetUser.name} already sent you connection request! Check`});
        }

        user.pendingRequests.push({userId : targetUser._id});

        targetUser.manageRequests.push({userId : user._id}); 

        await user.save();
        await targetUser.save();

        const notification = new notifyModel({
            message : `You have a new connection request from ${user.name}`,
            type : 'connection',
            senderUser : user._id,
            receiverUser : targetUser._id
        });

        await notification.save();

        return res.json({ message: `Connection request sent to ${targetUser.name}` });

    } catch (error) {
        next(error);
    }
}


export const acceptConnectionRequest = async (req, res, next) => {
    try {
        let requestId = req.params.userId;
        // requestId = requestId.toString();

        console.log(requestId , 'ith request id');
        const user = req.user;

        const connectionRequest = await user.manageRequests.find((reqst) => reqst.userId.equals(requestId));
        if(!connectionRequest){
            return res.status(404).json({ error: 'Connection request not found' });
        }

        // Add the sender of the request to the user's connections
        console.log(connectionRequest.userId , 'aysheri');
        user.connections.push({userId : requestId});

        // Add the user to the sender's connections
        let sender = await userModel.findById(connectionRequest.userId);
        if (sender) {
            sender.connections.push({ userId: user._id });
            await sender.save();
        } else {
            return res.status(404).json({error : 'sender not found'});
        }

        //removing recieved connection request from the user's manageRequests
        user.manageRequests = user.manageRequests.filter((reqst) => !reqst.userId.equals(requestId));

        //removing the request from the sender's pendingRequests
        sender = await userModel.findById(connectionRequest.userId);
        if(sender){
            sender.pendingRequests = sender.pendingRequests.filter((reqst) => !reqst.userId.equals(user._id));
            await sender.save();
        }
        await notifyModel.deleteOne({
            message : `You have a new connection request from ${sender.name}`,
            type : 'connection',
            receiverUser : user._id,
            senderUser : sender._id
        });

        // await sender.save();
        await user.save();

        await notifyModel.create({
            senderUser : user._id,
            receiverUser : connectionRequest.userId,
            message : `Request Accepted! You are connected with ${user.name}`,
        });

        return res.status(200).json({message : 'Request Accepted'});

    } catch (error) {
        next(error);
    }
}

export const rejectConnectionRequest = async (req, res, next) => {
    try {
        const requestId = req.params.userId;
        const user = req.user;
    
        const connectionRequest = await user.manageRequests.find((reqst) => reqst.userId.equals(requestId));
        if(!connectionRequest){
            return res.status(404).json({ error: 'Connection request not found' });
        }

        user.manageRequests = user.manageRequests.filter((reqst) => !reqst.userId.equals(requestId));
        await user.save();

        let sender = await userModel.findById(requestId);
        if(sender){
            sender.pendingRequests = sender.pendingRequests.filter((userr) => !userr.userId.equals(user._id));
            await sender.save();
        } else {
            return res.status(404).json({error : 'Sender not found'});
        }

        await notifyModel.deleteOne({
            message : `You have a new connection request from ${sender.name}`,
            type : 'connection',
            receiverUser : user._id,
            senderUser : sender._id
        });

        return res.json({message: 'Connection Request removed '});
    
    } catch (error) {
        next(error);
    }
}

// export const connectAndDisconnectUser = async (req, res, next) => {
//     try {
//         const id = req.params.userId;
//         const user = req.user; 

//         if(!user){
//             return res.status(404).json({error : 'No user found'});
//         }

//         let targetUser = await userModel.findById(id);
//         if(!targetUser){
//             const targetCompany = await companyModel.findById(id);

//             if(!targetCompany){
//                 return res.status(404).json({error : 'Company not found'});
//             }

//             targetUser = targetCompany;
//         }

//         if(!targetUser._id || !user._id){
//             return res.status(400).json({error : 'Invalid user'});
//         }

//         if (Array.isArray(user.connections)) {
//             const isConnected = user.connections.some((conn) => {
//                 return conn.userId && conn.userId.equals(targetUser._id);
//             });

//         if(isConnected){

//             user.connections = user.connections.filter((conn) => {
//                 return conn.userId && !conn.userId.equals(targetUser._id);
//             });

//             targetUser.connections = targetUser.connections.filter((conn) => {
//                 return conn.userId && !conn.userId.equals(user._id);
//             });

//             await user.save();
//             await targetUser.save();

//             await notifyModel.deleteOne({
//                 receiverUser : targetUser._id,
//                 senderUser : user._id,
//                 message : `${user.name} Followed You`,
//                 type : 'connection'
//             })

//             return res.json({message : `Connection Removed with ${targetUser.name}`});

//         } else {

//             user.connections.push({ userId: targetUser._id });

//             targetUser.connections.push({userId : user._id});

//             await user.save();
//             await targetUser.save();

//             await notifyModel.create({
//                 receiverUser : targetUser._id,
//                 senderUser : user._id,
//                 message : `${user.name} Followed You`,
//                 type : 'connection'
//             });

//             return res.json({message : `Connected with ${targetUser.name}`});
//         }

//     }else{
//         return res.status(400).json({ error: 'Invalid connections or targetUser._id' });
//     }

//     } catch (error) {
//         next(error);
//     }
// }

export const followAndUnfollowCompany = async (req , res, next) => {
    try {
        const companyId = req.params.companyId;
        const user = req.user;

        if(!user){
            return res.status(404).json({error : 'No user found'});
        }

        let targetUser = await userModel.findById(companyId);
        
        if(!targetUser){
            const targetCompany = await companyModel.findById(companyId);

            if(!targetCompany){
                return res.status(404).json({error : 'Company not found'});
            }

            targetUser = targetCompany;
            console.log(targetUser._id , 'ullil');
        }

        if(!targetUser._id || !user._id){
            return res.status(400).json({error : 'Invalid user'});
        }

        if(targetUser.role === 'Company'){
            if (Array.isArray(targetUser.followers)) {
                const isFollowing = targetUser.followers.some((conn) => {
                    if (user.role === 'Candidate' && conn.user) {
                        return conn.user.equals(user._id);
                    } else if (user.role === 'Company' && conn.company) {
                        return conn.company.equals(user._id);
                    }
                    return false;
                });

                if(isFollowing){
                    targetUser.followers = targetUser.followers.filter((conn) => {
                        return conn.user && !conn.user.equals(user._id) ||
                        conn.company && !conn.company.equals(user._id);
                    }) 

                    user.followingCompanies = user.followingCompanies.filter((conn) => {
                        return conn.company && !conn.company.equals(targetUser._id);
                    })

                    await notifyModel.deleteOne({
                        senderUser : user._id,
                        recieverUser : targetUser._id,
                        message : `${user.name} Followed You`,
                        type : 'posts'
                    });

                    await notifyModel.create({
                        senderUser : user._id,
                        recieverUser : targetUser._id,
                        message : `${user.name} Unfollowed You`,
                        type : 'posts'
                    })

                    await user.save();
                    await targetUser.save();

                    return res.json({message : `UnFollowed ${targetUser.name}`})

                } else {

                    if(user.role === 'Candidate'){
                        targetUser.followers.push({user : user._id});

                    } else {
                        targetUser.followers.push({company : user._id});
                    }

                    user.followingCompanies.push({company : targetUser._id});

                    await notifyModel.create({
                        senderUser : user._id,
                        recieverUser : targetUser._id,
                        message : `${user.name} Followed You`,
                        type : 'posts'
                    });

                    await user.save();
                    await targetUser.save();

                    return res.json({message : `Followed ${targetUser.name}`})
                }
            } else {
                return res.status(400).json({error : 'Not acceptable'});
            }
        } 

    } catch (error) {
        next(error);
    }
}



export const search = async (req, res, next) => {
    try {
        const {query} = req.query;

        const posts = await postModel.find({
            description: { $regex: new RegExp(query, 'i') }, // 'i' makes it case-insensitive
          })
        .populate('user')
        .populate('company')
        .populate('comments');

        if(!posts){
            return res.status(401).json({error : 'Post not found!'});
        }

        return res.json({message : 'Search success' , posts});

    } catch (error) {
        next(error);
    }
}

// *********************************************************************************
// *********************************************************************************

export const displayNotifications = async (req, res, next) => {
    try {
        const user = req.user;

        const notifications = await notifyModel.find({receiverUser : user._id})
        .populate("senderUser")
        .populate('post')
        .sort({createdAt : -1}).exec();

        if(!notifications){
            return res.status(404).json({message : 'No new Notifications'});
        }

        return res.status(200).json({message : 'notifications exist' , notifications});

    } catch (error) {
        next(error);
    }
}



export const clearNotifications = async (req, res, next) => {
    try {
        const user = req.user;
        const notifications = await notifyModel.deleteMany({
            receiverUser : user._id,
            type : {$ne : 'connection'}
        });

        if(!notifications){
            return;
        }

        return res.status(200).json({message : 'Cleared All Notifications'});

        
    } catch (error) {
        next(error);
    }
}







// *********************************************************************************
// *********************************************************************************

export const getIndustries = async (req, res, next) => {
    try {
        const user = req.user;

        const industriesData = await categoryModel.find();

        if(!industriesData){
            return res.status(404).json({error : 'Not found'});
        }

        const industries = industriesData.map(industry => industry.industry);

        return res.status(200).json({message : 'Success' , industries});
        
    } catch (error) {
        next(error);
    }
}

export const jobApplication = async (req, res, next) => {
    try {
        const user = req.user;
        const jobId = req.params.jobId;

        if(user.role === 'Candidate'){
            const job = await jobModel.findById(jobId);
            

            if(!job){
                return res.status(404).json({error : 'Job not found'});
            }

            const applicantExists = await job.applicants.some((applicants) => applicants.userId.equals(user._id));

            if(!applicantExists){

                console.log('ha ethi');

                await job.applicants.push({ userId: user._id, resumeUrl: user.resume ? user.resume : null });
                await job.save();
                
                return res.status(200).json({message : 'Applied Successfully'});

            } else {
                
                return res.status(403).json({error : 'Already Applied'});
            }
        }
    } catch (error) {
        next(error);
    }
}

export const getApplicants = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;

        const job = await jobModel.findById(jobId).populate('applicants.userId');

        if(!job){
            return res.status(404).json({error : 'Job not Found'});
        }

        return res.json({message : 'Success' , job});

    } catch(error) {
        next(error);
    }
}

export const updateApplicationStatus = async (req, res, next) => {
    try {
        const newStatus = req.body.newStatus;
        const applicationId = req.params.applicationId;
        const user = req.user;

        //to find job with specific appplication
        const job = await jobModel.findOne({'applicants._id' : applicationId});

        if(!job){
            return res.status(404).json({ message: 'Job not found' });
        }

        //to find specific application within applicants array of finded job
        const application = job.applicants.find((appli) => appli._id.toString() === applicationId);

        if(!application){
            return res.status(404).json({ message: 'Application not found' });
        }

        application.status = newStatus;

        // if(application.status === 'Rejected'){
        //     job.applicants = job.applicants.filter((appli) => appli._id.toString() !== applicationId);
        // }

        if(application.status === 'Accepted' || application.status === 'Rejected'){
            await notifyModel.create({
                senderUser : user._id,
                receiverUser : application.userId,
                message : `Your Job Application for ${job.position} was ${application.status} by ${user.name}`,
                type : 'job'
            });
        }
        await job.save();

        return res.status(200).json({message : 'updated Successfully'});

    } catch (error) {
        next(error);
    }
}


// *********************************************************************************
// *********************************************************************************



export const getChatUsers = async (req, res, next) => {
    try {
        const user = req.user;

        const findUser = await userModel.findById(user._id);
        if(!findUser){
            return res.status(400).json({error : 'USer not found'});
        }

        const connectionUsers = findUser.connections.map((connection) => connection.userId);

        const chatUsers = await userModel.find({_id : {$in : connectionUsers}});

        console.log(chatUsers);

        return res.status(200).json({message : 'fetched' , chatUsers});

    } catch (error) {
        next(error);
    }
}