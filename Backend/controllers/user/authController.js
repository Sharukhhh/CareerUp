import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../../models/userModel.js';
import companyModel from '../../models/companyModel.js';



const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password , salt);

    return hash;
}  

export const register = async (req, res , next) => {
    try {
        const {name , email , role , password} = req.body;

        const existingUser = await userModel.findOne({email});
        const existingCompany = await companyModel.findOne({email});

        if(existingUser || existingCompany){
            return res.status(400).json({error : 'Account already exists'});
        }

        const bcryptedpassword = await hashPassword(password);

        if(role === 'Candidate'){
            const user = new userModel({
                name , email , role , password : bcryptedpassword
            })

            await user.save(); 
            console.log(user);

            res.status(201).json({user ,message : 'Account created successfully'});

        } else {
            const company = new companyModel({
                name , email , role , password : bcryptedpassword
            })

            await company.save();
            console.log(company);

            res.status(201).json({company ,message : 'Account created successfully'});
        }

    } catch (error) {
        next(error);
        
    }
}


export const login = async (req, res , next) => {
    try {
        const {email , password} = req.body;

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
            const token = jwt.sign({userId : company.id , email : company.email} , process.env.JWT_SECRET , {expiresIn : '1h'});
            return res.status(200).json({message : 'Login successfully' ,
            companyTokenData : {
                username : company.name, useremail : company.email , role : company.role, token
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

        const token = jwt.sign({userId : user.id , email : user.email} , process.env.JWT_SECRET , {expiresIn : '1h'});
        return res.status(200).json({message : 'Login successfully' ,
        userTokenData : {
            username : user.name, useremail : user.email , role: user.role, token
        }});

        
    } catch (error) {
        next(error);
    }
}


// *********************************************************************************
// *********************************************************************************

export const googleSignup = async (req, res , next) => {
    try {
        const token = req.body.credential;

        const decodedData = jwt.decode(token);

        const {name , email , picture , jti} = decodedData;

        const newUser = new userModel({
            name , email , profileImage : picture , password : jti , role : 'Candidate' ,
        });

        await newUser.save();

        res.status(201).json({message: 'user saved succesfully'});

    } catch (error) {
        next(error);
    }
}


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
                    username : user.name , useremail : user.email, role : user.role
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