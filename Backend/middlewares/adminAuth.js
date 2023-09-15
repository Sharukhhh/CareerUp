import jwt from 'jsonwebtoken';
import adminModel from '../models/admin.js';

export const verifyAdmin = async (req, res , next) => {
    try { 
        const tokenHeader = req.header('Authorization');
        console.log(tokenHeader , 'ghrherehetheehre');    
        
        if (!tokenHeader) { 
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = tokenHeader.split(' ')[1];
        console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' , token);

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.body.adminId = decodedToken.adminId;

        next(); 

    } catch (error) {
        console.log(error , 'midlwre error');
    }
}