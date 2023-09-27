import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import companyModel from '../models/companyModel.js';


export const verify = async (req, res , next) => {     
    try {
        // console.log(req.header('authorization'), '#######');
        let token = req.header('authorization').split(' ')[1];
        // console.log(token , '@@@@@@'); 
        
        if(token === null){         
            return res.status(401).json({message : 'Unauthorized!, not token found'});
        }

        token = token.replaceAll('"', '');

        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        console.log(decoded, 'XXXXXXXXXXXXXXXXXXXX');
        // console.log(decoded.role ,decoded.userId , 'OKKKKKKKKKKKKKKKKKKKKKKK');

        const userId = decoded.userId;
        // const role = decoded.role;

        let user;
        user = await userModel.findById(userId);

        if(user.isBlocked){
            return res.status(401).json({ message: 'Account is blocked' });
        }

        if(!user){
            let company = await companyModel.findById(userId);

            if(!company){
                return res.status(401).json({ message: 'Unauthorized - User not found' });
            }

            if(company.isBlocked){
                return res.status(401).json({ message: 'Account is blocked' });
            }
            user = company;
        }

        req.user = user;

        // let user;

        // if (role === 'Candidate') {
        //     user = await userModel.findById(userId);
        // } else if (role === 'Company') {
        //     user = await companyModel.findById(userId);
        // }

        // if(!user){
        //     return res.status(401).json({ message: 'Unauthorized - User not found' });
        // }

        // if(user.isBlocked){
        //     return res.status(401).json({ message: 'Account is blocked' });
        // }

        // req.user = user;
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}