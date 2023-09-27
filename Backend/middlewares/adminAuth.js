import jwt from 'jsonwebtoken';
import adminModel from '../models/admin.js';

export const verifyAdmin = async (req, res , next) => {
    try { 
        // console.log(req.header('authorization'), '#######');
        let token = req.header('authorization').split(' ')[1];
        // console.log(token , '@@@@@@');
        
        if(token === null){         
            return res.status(401).json({message : 'Unauthorized!, not token found'});
        }

        token = token.replaceAll('"',"");

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const adminId = decodedToken.adminId;

        const admin = await adminModel.findById(adminId);

        if(!admin){
            return res.status(401).json({ message: 'Unauthorized - User not found' });
        }

        req.admin = admin;
        next(); 

    } catch (error) {
        console.log(error , 'midlwre error');
    }
}