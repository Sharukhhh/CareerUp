import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import userModel from '../../models/userModel.js';
import companyModel from '../../models/companyModel.js';
import { sendVerificationEmail } from '../../utils/verificationMail.js';


const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); 

    const hash = await bcrypt.hash(password , salt);

    return hash;
}  

let globalStored = null;

/*
    description: 'User Regsiter before OTP Verfiication'
    method: POST,
    path: '/auth/register'
*/
export const register = async (req, res , next) => {
    try {

        let {username , email , phone, role , password} = req.body.userData;
        phone = Number(phone);

        const existingUser = await userModel.findOne({email});
        const existingCompany = await companyModel.findOne({email});

        let existingMobile = await userModel.findOne({phone});
        if(!existingMobile){
            existingMobile = await companyModel.findOne({phone});

            if(existingMobile){
                return res.status(401).json({error : 'Account already exists'});
            }
        }

        if(existingUser || existingCompany || existingMobile){
            return res.status(401).json({error : 'Account already exists'});
        }

        const phoneNumberPattern = /^[0-9]{10}$/;
        if (!phoneNumberPattern.test(phone)) {
            return res.status(401).json({ error: 'Invalid phone number' });
        }

        const userData = {
            username , email , phone , role , password
        };

        if(userData){
            const {otpValue , result} =  await sendVerificationEmail(email);
            globalStored = otpValue;

            if(otpValue && result){
                return res.json({message : 'Check email for OTP Verification'})

            } else if(!result || !otpValue) {
                return res.status(500).json({error : 'Verification email failed to send'})
            }
        }
    } catch (error) {
        next(error);
        
    }
}


/*
    description: 'User Regsiter after OTP Verfiication'
    method: POST,
    path: '/auth/otpregister'
*/
export const otpRegister = async (req, res, next) => {
    try {
        console.log(req.body);
        console.log(globalStored)
        let {username , email , phone, role , password } = req.body.userData;
        let otp = req.body.otp;
        otp = Number(otp);

        const existingUser = await userModel.findOne({email});
        const existingCompany = await companyModel.findOne({email});

        let existingMobile = await userModel.findOne({phone})
        if(!existingMobile){
            existingMobile = await companyModel.findOne({phone});

            if(existingMobile){
                return res.status(401).json({error : 'Account already exists'});
            }
        }

        if(existingUser || existingCompany || existingMobile){
            return res.status(401).json({error : 'Account already exists'});
        }

        const phoneNumberPattern = /^[0-9]{10}$/;
        if (!phoneNumberPattern.test(phone)) {
            return res.status(401).json({ error: 'Invalid phone number' });
        }

        if(otp === globalStored) {

            const bcryptedpassword = await hashPassword(password);

            if(role === 'Candidate'){
                const user = new userModel({
                    name: username , email , role , phone, password : bcryptedpassword
                })
                await user.save(); 
                console.log(user);
    
                res.status(201).json({user ,message : 'Verification success!'});
    
            } else {
                const company = new companyModel({
                    name: username , email , role , phone, password : bcryptedpassword
                })
                await company.save();
                console.log(company);
    
                res.status(201).json({company ,message : 'Verification Success!'});
            }
        } else {
            return res.status(500).json({error : 'Invalid OTP'});
        }
    } catch (error) {
        next(error);
    }
}



/*
    description: 'User Login'
    method: POST,
    path: '/auth/login'
*/
export const login = async (req, res , next) => {
    try {
        const {email , password} = req.body.userData;

        const user = await userModel.findOne({email});

        if(!user){
            const company = await companyModel.findOne({email});

            if(!company){
                return res.status(401).json({error : 'Account Does not exist'});
            }

            if (company.isBlocked) {
                return res.status(401).json({ error: 'Account is blocked' });
            }

            //if company - password verify
            const matchPassword = await bcrypt.compare(password , company.password);

            if(!matchPassword){
                return res.status(401).json({error : 'Inavlid Password'});
            }
            const token = jwt.sign({userId : company.id } , process.env.JWT_SECRET , {expiresIn : '2h'});

            return res.status(200).json({message : 'Login successfully' , token,
            companyData : {
                username : company.name, useremail : company.email , 
                userId : company._id , role : company.role,
            }});
        }

        if (user.isBlocked) {
            return res.status(401).json({ error: 'Account is blocked' });
        }

        //if user - password verify
        const matchPassword = await bcrypt.compare(password , user.password);

        if(!matchPassword){
            return res.status(401).json({error : 'Invalid Password'});
        }

        const token = jwt.sign({userId : user.id } , process.env.JWT_SECRET , {expiresIn : '1h'});

        return res.status(200).json({message : 'Login successfully' , token,
        userData : {
            username : user.name, useremail : user.email ,
            userId : user._id  , role: user.role,
        }});

        
    } catch (error) {
        next(error);
    }
}


// export const resendOTP = async (req, res, next) => {
//     try {
//         let {name , email , phone, role , password} = req.body;
//         phone = Number(phone);



//     } catch (error) {
//         next(error);
//     }
// }


// *********************************************************************************
// *********************************************************************************

/*
    description: 'User Regsiter using Google '
    method: POST,
    path: '/auth/google'
*/
export const googleSignup = async (req, res , next) => {
    try {
        const token = req.body.credential;

        const decodedData = jwt.decode(token);

        const {name , email , picture , jti} = decodedData;

        const user = await userModel.findOne({email});

        if(user){
            return res.status(401).json({error : 'User Already Exist'});
        }

        const newUser = new userModel({
            name , email , profileImage : picture , password : jti , role : 'Candidate' ,
        });

        await newUser.save();

        res.status(201).json({message: 'user saved succesfully'});

    } catch (error) {
        next(error);
    }
}


/*
    description: 'User Login using Google '
    method: POST,
    path: '/auth/google/login'
*/
export const googleLogin = async (req, res , next) => {
    try {
        const token = req.body.credential;

        const decodedData = jwt.decode(token);

        const {name , email , profileImage , jti} = decodedData;

        const user = await userModel.findOne({email : email});

        if(user){

            if (user.isBlocked) {
                return res.status(401).json({ error: 'Account is blocked' });
            }

            let token = jwt.sign({userId : user.id , email : user.email} , process.env.JWT_SECRET, {expiresIn: '1h'});
            res.status(200).json({message : 'Login Successfull' ,  token, 
                userData : {
                    username : user.name , useremail : user.email, role : user.role,
                    userId : user._id,
                    profileImage : profileImage
                }});

        } else {
            res.status(401).json({error : 'User not found'});
        }
    } catch (error) {
        next(error);
    }
}

// *********************************************************************************
// *********************************************************************************