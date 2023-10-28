import adminModel from "../../models/admin.js";
import jwt from "jsonwebtoken";
import userModel from "../../models/userModel.js";
import companyModel from "../../models/companyModel.js";
import categoryModel from "../../models/category.js";
import postModel from "../../models/posts.js";
import jobModel from "../../models/jobs.js";

// ADMIN - auth
export const adminLogin = async (req, res) => {
    try {
        const {email ,password} = req.body;

        const admin = await adminModel.findOne({email});

        if(!admin){ 
            return res.status(400).json({error : 'Admin not found'});
        } else {

            if(password === admin.password){      
                const token =jwt.sign({adminId : admin.id , adminmail : admin.email} , process.env.JWT_SECRET ,{expiresIn : '1hr'});
                return res.status(200).json({message : 'Login Successfull' , token});
            } else {
                return res.status(400).json({error : 'Admin not found'});
            }
        }
    } catch (error) {
        console.log(error);
    }
}
// *********************************************************************************
// *********************************************************************************

export const dashboardValues = async(req, res, next) => {
    try {
        const adminUser = req.user;

        
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        //array to store monthly data
        const userMonthlyCounts = new Array(12).fill(0);
        const companyMonthlyCounts = new Array(12).fill(0);

        const users = await userModel.find();
        const companies = await companyModel.find();

        //counting both users joined per month
        users.forEach((user) => {
            const userDate = new Date(user.createdOn);
            const userYear = userDate.getFullYear();
            const userMonth = userDate.getMonth();

            if(userYear === currentYear){
                userMonthlyCounts[userMonth]++;
            }
        });

        companies.forEach((company) => {
            const companyDate = new Date(company.createdOn);
            const companyYear = companyDate.getFullYear();
            const companyMonth = companyDate.getMonth();

            if(currentYear === companyYear){
                companyMonthlyCounts[companyMonth]++;
            }
        });

        // .................................................................
        // .................................................................

        const jobPostingMonthlyCounts = new Array(12).fill(0);
        const jobApplicationMonthlyCounts = new Array(12).fill(0);

        const jobPostings = await jobModel.find();
        jobPostings.forEach((job) => {
            const jobDate = new Date(job.createdAt);
            const jobYear = jobDate.getFullYear();
            const jobMonth = jobDate.getMonth();

            if(jobYear === currentYear){
                jobPostingMonthlyCounts[jobMonth]++;
            }
        });

        //count and storing job applications per month
        const jobApplications = await jobModel.aggregate([
            {
                $unwind : '$applicants',
            },
            {
                $project : {
                    year : {$year : '$applicants.appliedAt'},
                    month : {$month : '$applicants.appliedAt'}
                }
            },
            {
                $group : {
                    _id : {year : '$year' , month : '$month'},
                    count : {$sum : 1}
                }
            }
        ]);

        jobApplications.forEach((application) => {
            const applyYear = application._id.year;
            const applyMonth = application._id.month;

            if(applyYear === currentYear){
                jobApplicationMonthlyCounts[applyMonth - 1] = application.count;
            }
        })
        // .....................................................................
        // ......................................................................

        //total users
        const totalUsers = await userModel.countDocuments();

        //total companies
        const totalCompanies = await companyModel.countDocuments();

        //total posts
        const totalPosts = await postModel.countDocuments();

        //total jobs openings posted
        const totalJobs = await jobModel.countDocuments();

        if(!totalUsers || !totalCompanies || !totalPosts || !totalJobs){
            return res.status(404).json({error : 'documents not found'});
        }

        return res.status(200).json({message : 'success',
        totalUsers ,
        totalCompanies,
        totalJobs,
        totalPosts,
        userMonthlyCounts,
        companyMonthlyCounts,
        jobApplicationMonthlyCounts,
        jobPostingMonthlyCounts
    });

    } catch (error) {
        next(error);
    }
}


// *********************************************************************************
// *********************************************************************************


// ADMIN - User Managment
export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find().sort({_id : -1});

        if(users){
            res.status(200).json({users});
        } else {
            res.status(404).json({error : 'No users registered'});
        }

    } catch (error) {
        console.log(error);
    }
}

export const blockUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const updateUser = await userModel.findByIdAndUpdate(userId, 
                {isBlocked : true} , {new : true}
            );

        if(!updateUser){
            return res.status(404).json({error : 'User not found'});
        }

        res.status(200).json({message : `Blocked ${updateUser.name}`});

    } catch (error) {
        console.log(error);
    }
}

export const unBlockUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const updateUser = await userModel.findByIdAndUpdate(userId, 
                {isBlocked : false} , {new : true}
            );

        if(!updateUser){
            return res.status(404).json({error : 'User not found'});
        }

        res.status(200).json({message : `Unblocked ${updateUser.name}`});
    } catch (error) {
        console.log(error);
    }
}
// **********************************************************************************
// *********************************************************************************

// ADMIN - Company Management
export const getCompanies = async(req, res) => {
    try {  
        const companies = await companyModel.find().sort({_id : -1});
        
        if(companies){
            res.status(200).json({companies});
        } else {
            res.status(404).json({error: 'no companies registered'});
        }
        
    } catch (error) {
        console.log(error);
    }
} 

export const verifyCompany = async (req, res) => {
    try {
        const companyId = req.params.id;

        if(!companyId){
            return res.status(404).json({error : 'Company not found'});
        }

        const updateCompany = await companyModel.findByIdAndUpdate(companyId,
                {verify : true} , {new : true}
        );

        if(!updateCompany){
            return res.json({error : 'Not Properly Updated'});
        }
        
        res.status(200).json({message : 'Verified Successfully'});

    } catch (error) {
        console.log(error);
    }
}


export const blockCompany = async (req, res) => {
    try {
        const companyId = req.params.id;

        if(!companyId){
            return res.status(404).json({error : 'Company not found'});
        }

        const updateCompany = await companyModel.findByIdAndUpdate(companyId,
            {isBlocked : true} , {new : true}
        );

        res.json({message : `Blocked ${updateCompany.name}!!`});

    } catch (error) {
        console.log(error);
    }
}

export const unBlockCompany = async (req, res) => {
    try {
        const companyId = req.params.id;

        if(!companyId){
            return res.status(404).json({error : 'Company not found'});
        }

        const updateCompany = await companyModel.findByIdAndUpdate(companyId,
            {isBlocked : false} , {new : true}
        );

        res.json({message : `UnBlocked ${updateCompany.name}!!`});
        
    } catch (error) {
        console.log(error);
    }
}


export const addCategory = async (req, res, next) => {
    try {
        const {industry} = req.body;

        const existingIndustry = await categoryModel.findOne({industry : {
            $regex : new RegExp(`^${industry}$`, 'i')
        }});

        if(existingIndustry){
            return res.status(400).json({error : 'Industry Already Exists'});
        }

        if (/\d/.test(industry)) {
            return res.status(400).json({ error: 'Invalid Entry!' });
        }

        const newIndustry = await categoryModel.create({
            industry : industry
        });

        res.status(200).json({message : 'Industry Added' , newIndustry}); 

    } catch (error) {
        next(error);
    }
}

export const getIndustries = async (req, res, next) => {
    try {
        const industries = await categoryModel.find().sort({addedAt : -1});
        if(!industries){
            return res.status(404).json({error : 'Industries Not found'});
        }

        res.status(200).json({message : 'success' , industries});
    } catch (error) {
        next(error);
    }
}


export const deleteIndustry = async (req, res, next) => {
    try {
        const industryId = req.params.industryId;

        if(!industryId){
            return res.status(404).json({error : 'Industry Not Found'});
        }

        const industry = await categoryModel.findByIdAndRemove(industryId);

        if(!industry){
            return res.status(404).json({ error: 'Industry Not Found' });
        }

        res.status(200).json({message : 'Industry Removed Successfully'});

    } catch (error) {
        next(error);
    }
}

// **********************************************************************************
// *********************************************************************************

export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await postModel.find()
        .populate('user')
        .populate('company')
        .sort({createdAt : -1});

        if(!posts){
            return res.status(404).json({error : 'No Posts available'});
        }

        return res.status(200).json({message : 'Posts fetched successfully' , posts});

    } catch (error) {
        next(error);
    }
}

export const PostDelete = async (req, res , next) => {
    try {
        const postId = req.params.postId;
        if(!postId){
            return res.status(404).json({error : 'Invalid'})
        }

        const post = await postModel.findByIdAndRemove(postId);

        if(!post){
            return res.status(404).json({error : 'post not found'});
        }

        return res.status(200).json({message : 'Deleted Successfully'});

    } catch (error) {
        next(error);
    }
}