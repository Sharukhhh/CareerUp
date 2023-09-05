import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import companyModel from '../models/companyModel.js';



const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password , salt);

    return hash;
}  

export const register = async (req, res) => {
    try {
        const {name , email , role , password} = req.body;

        const existingUser = await userModel.findOne({email})

        if(existingUser){
            return res.json({message : 'Account already exists'});
        }

        const bcryptedpassword = await hashPassword(password);

        if(role === 'Candidate'){
            const user = new userModel({
                name , email , role , password : bcryptedpassword
            })

            await user.save(); 
            console.log(user);
        } else {
            const company = new companyModel({
                name , email , role , password : bcryptedpassword
            })

            await company.save();
            console.log(company);
        }

        res.status(201).json({message : 'Account created successfully'});

    } catch (error) {
        console.log(error);
    }
}



export const login = async (req, res) => {
    try {
        const {email , password} = req.body;

        const user = await userModel.findOne({email});

        if(!user){
            const company = await companyModel.findOne({email});

            if(!company){
                return res.json({message : 'Account Does not exist'});
            }

            //if company - password verify
            const matchPassword = await bcrypt.compare(password , company.password);

            if(!matchPassword){
                return res.json({message : 'Inavlid Password (c)'});
            }
            const token = jwt.sign({userId : company.id , email : company.email} , process.env.JWT_SECRET , {expiresIn : '1h'});
            return res.status(200).json({message : 'Login successfully' , token});
        }

        //if user - password verify
        const matchPassword = await bcrypt.compare(password , user.password);

        if(!matchPassword){
            return res.json({message : 'Invalid Password'});
        }

        const token = jwt.sign({userId : user.id , email : user.email} , process.env.JWT_SECRET , {expiresIn : '1h'});
        return res.status(200).json({message : 'Login successfully' , token});

        
    } catch (error) {
        console.log(error);
    }
}


export const logout = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}