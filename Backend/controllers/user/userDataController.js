import userModel from "../../models/userModel.js";
import companyModel from "../../models/companyModel.js";
import jobModel from "../../models/jobs.js";
import cloudinary from "../../utils/cloudinary.js";
import categoryModel from "../../models/category.js";
import fs from 'fs';
import notifyModel from "../../models/notificationModel.js";

export const getEditData = async (req, res, next) => {
    try {
        const itemId = req.params.id;
        const user = req.user;

        let userData;
        let companyJobData;

        if(user){
            if(user.role === 'Candidate'){
                userData = await userModel.findById(user._id);
            } else if(user.role === 'Company'){
                
                companyJobData = await jobModel.findById(itemId).populate('postedBy')
                .populate('industry');

                if(companyJobData){
                    return res.status(200).json({message : 'job info success' , info : companyJobData});
                }
            }
        }

        if (!userData && !companyJobData) {
            return res.status(404).json({ message: 'User or Company not found' });
        }

        let itemToEdit;
        if(userData){
            if(userData.education){
                itemToEdit = userData.education.find((edu) => edu._id.toString() === itemId);
            }

            if(!itemToEdit && userData.profession){
                itemToEdit = userData.profession.find((edu) => edu._id.toString() === itemId);
            }
        }

        if(!itemToEdit){
            return res.status(404).json({ message: 'Item not found' });
        }

        if(user._id.toString() === (userData && userData._id.toString()) || 
        (companyData && user._id.toString() === companyData._id.toString())){

            return res.status(200).json({ message: 'Edit data fetched successfully', info: itemToEdit });
        } else {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

    } catch (error) {
        next(error);  
    }
}

// *********************************************************************************
// *********************************************************************************

export const addBasic = async (req, res, next) => {  
    try {
        const user = req.user;
        const { location , headline } = req.body;

        const data = req.files;
        let profileImagerUrl = null;

        if(data && data.profileImage){
            const result = await cloudinary.uploader.upload(data.profileImage[0].path);
            profileImagerUrl = result.secure_url;
        }

        let resumeUrl = null;
        if(data && data.resume){

            resumeUrl = data.resume[0].filename;

            console.log(resumeUrl , 'resumeURL');
            // resumeUrl = `public/resumes/${resumeFile.filename}`;

            // fs.rename(resumeFile.path , resumeUrl , (err) => {
            //     if(err){
            //         return res.status(400).json({error : 'error while changing pathname'});
            //     }
            // }); 
            // const result = await cloudinary.uploader.upload(data.resume[0].path);
            // resumeUrl = result.secure_url;
        }

        let updatedUser;
        if(user.role === 'Candidate'){
            updatedUser = await userModel.findByIdAndUpdate(user._id , {
                location : location, 
                headline : headline, 
                profileImage : profileImagerUrl,
                resume: resumeUrl
            } , 
            {new : true});

            console.log(updatedUser , 'ith cloud url');

        } else {
            updatedUser = await companyModel.findByIdAndUpdate(user._id ,{
                location : location , 
                headline : headline,
                profileImage : profileImagerUrl
            } , {new : true});
            
        }

        if(updatedUser){
            return res.status(200).json({message : 'Updated Successfully'});
            
        } else {
            return res.status(404).json({error : 'user not found'});
        }

    } catch (error) {
        next(error);
    }
}

// *********************************************************************************
// *********************************************************************************


export const addEducation = async (req, res , next) => {
    try {

        const id = req.params.id;
        const {institute , instituteLocation , fieldOfStudy } = req.body;

        if (!institute || !fieldOfStudy || !instituteLocation) {
            return res.status(400).json({ error: 'Fill All The Fields!' });
        }

        const user = await userModel.findById(id);

        if(!user){
            return res.status(404).json({error : 'User not found'});
        }

        const newEducation = {
            institute,
            instituteLocation,
            fieldOfStudy,
        };
        await user.education.push(newEducation);

        await user.save();
        return res.json({message : 'Education Updated'});

    } catch (error) {
        next(error);
    }
}

export const editEducation  = async (req, res, next) => {
    try {
        
        const {institute , fieldOfStudy , instituteLocation} = req.body;

        if (!institute || !fieldOfStudy || !instituteLocation) {
            return res.status(400).json({ error: 'Fill All The Fields!' });
        }

        const itemId = req.params.educationId;
        const user = req.user;

        
        if(!itemId){
            return res.status(404).json({error : 'Item not found'});
        }

        const updatedEducation = await userModel.findOneAndUpdate(
            {
                _id : user._id,
                'education' : {
                    $elemMatch : {_id : itemId}
                }
            },

            {$set : {
                'education.$.institute': institute,
                'education.$.fieldOfStudy': fieldOfStudy,
                'education.$.instituteLocation': instituteLocation
            }},

            {new : true}
        );

        if(!updatedEducation){
            return res.status(404).json({error : 'No document to update' });
        }

        return res.status(200).json({message : 'updated Successfully'});

    } catch (error) {
        next(error);
    }
}

export const deleteEducation = async (req, res, next) => {
    try {
        const educationId = req.params.educationId;

        if(!educationId){
            return res.status(404).json({error : 'Details not found'});
        }

        const result = await userModel.updateOne(
            {'education._id' : educationId},
            {$pull : {education : {_id : educationId}}}
        );

        if(result.nModified === 0){
            return res.status(404).json({error : 'Document not found'});
        }

        const updatedUser = await userModel.findOne({'education._id' : educationId});
        // if(!updatedUser){
        //     return res.status(404).json({error : 'User not found'});
        // }

        res.json({message : 'Deleted Succesfully' , user: updatedUser});
        
    } catch (error) {
        next(error); 
    }
}

// *********************************************************************************
// *********************************************************************************

export const addProfession = async (req, res, next) => {
    try {

        const id = req.params.id;
        const {companyName , jobLocation , role } = req.body;

        if(!companyName || !jobLocation || !role){
            return res.status(400).json({error : 'Please provide all required fields for Profession'})
        }

        const user = await userModel.findById(id);
        if(!user){
            return res.status(404).json({error : 'User not found'});
        }

        const newProfession = {
            companyName, jobLocation, role
        };
        await user.profession.push(newProfession);

        await user.save();
        return res.json({message : 'Profession Updated'})

    } catch (error) {
        next(error);
    }
}

export const editProfession = async (req, res, next) => {
    try {
        const {companyName , jobLocation , role } = req.body;

        const itemId = req.params.professionId;
        const user = req.user;

        if(!companyName || !jobLocation || !role){
            return res.status(400).json({error : 'Please provide all required fields for Profession'})
        }

        if(!itemId){
            return res.status(404).json({error : 'Item not found'});
        }

        const updatedProfession = await userModel.findOneAndUpdate(
            {
                _id : user._id,
                'profession' : {
                    $elemMatch : {_id : itemId}
                }
            },

            {$set : {
                'profession.$.companyName' : companyName,
                'profession.$.jobLocation' : jobLocation,
                'profession.$.role' : role
            }},

            {new  : true}
        );

        if(!updatedProfession){
            return res.status(404).json({error : 'No document to update' });
        }

        return res.status(200).json({message : 'updated Successfully'});


    } catch (error) {
        next(error);
    }
}

export const deleteProfession = async (req, res, next) => {
    try {
        const professionId = req.params.professionId;

        if(!professionId){
            return res.status(404).json({error : 'Details not found'});
        }

        const result = await userModel.updateOne(
            {'profession._id' : professionId},
            {$pull : {profession : {_id : professionId}}}
        );

        if(result.nModified === 0){
            return res.status(404).json({error : 'Document not found'});
        }

        const updatedUser = await userModel.findOne({'profession._id' : professionId});
        // if(!updatedUser){
        //     return res.status(404).json({error : 'User not found'});
        // }

        res.json({message : 'Deleted Succesfully', user : updatedUser});
    } catch (error) {
        next(error);
    }
}

// *********************************************************************************
// *********************************************************************************

export const getOwnPostedJobs = async (req, res, next) => {
    try {

        const user = req.user;

        if(user.role === 'Company'){
            const jobs = await jobModel.find({postedBy : user._id});

            if(!jobs){
                return res.status(404).json({error : 'No jobs Posted'});
            }

            res.status(200).json({message: 'Jobs fetched!', jobs});
        } 
    } catch (error) {
        next(error);
    }
}

export const displayJobs = async (req, res, next) => {
    try {
        const user = req.user;

        const jobs = await jobModel.find().populate('industry').populate('postedBy').exec();
        if(!jobs){
            return res.status(404).json({error : 'Data Not found'})
        }

        res.status(200).json({message : 'Success' , jobs});
    } catch (error) {
        next(error);
    }
}

export const createJob = async (req, res, next) => {
    try {
        const {position , location , salaryPackage, industry, requirements} = req.body;
        const user = req.user;

        if(!user){
            return res.status(401).json({error : 'User not found'});
        }

        if(!position || !location || !requirements || !salaryPackage || !industry){
            return res.status(400).json({error : 'Fill all the fields'});
        }

        const industryObject = await categoryModel.findOne({ industry: industry }); 
        if (!industryObject) {
            return res.status(400).json({ error: 'Invalid industry' });
        }

        const jobPost = new jobModel({
            postedBy : user._id,
            position ,
            salaryPackage,
            location,
            requirements,
            industry : industryObject._id
        });
        await jobPost.save();

        return res.status(200).json({message : 'Job Post Added' , jobPost});

    } catch (error) {
        next(error);
    }
}


export const editJob = async (req, res, next) => {
    try {
        const user = req.user;
        const {position , location , salaryPackage, industry, requirements} = req.body;
        
        const jobId = req.params.jobId;

        const industryObject = await categoryModel.findOne({ industry: industry }); 
        if (!industryObject) {
            return res.status(400).json({ error: 'Invalid industry' });
        }

        await jobModel.findByIdAndUpdate(jobId , {
            postedBy : user._id,
            position ,
            salaryPackage,
            location,
            requirements,
            industry  : industryObject._id
        } , {new : true});

        return res.status(200).json({message : 'Updated Successfully'});

    } catch (error) {
        next(error);
    }
}


export const deleteJob = async (req, res, next) => {
    try {
        const user = req.user;
        const jobId = req.params.jobId;

        let job = await jobModel.findOne({_id : jobId , postedBy : user._id})
        .populate('applicants.userId');

        if(!job){
            return res.status(404).json({error : 'Job not found'});
        }

        const applicantsUserIds = job.applicants.map((applicant) => applicant.userId);

        if(applicantsUserIds.length > 0){
            const notifications = applicantsUserIds.map((applicantUserId) => ({
                senderUser : user._id,
                receiverUser : applicantUserId,
                message : `The job you applied for "${job.position}" has been removed by ${user.name} 
                            and is no longer accepting any applications.`
            }));
        
            await notifyModel.create(notifications);
        }

        await jobModel.deleteOne({_id : jobId , postedBy : user._id});
    
        return res.status(200).json({message : 'Job Deleted Successfully'});

    } catch (error) {
        next(error);
    }
}




