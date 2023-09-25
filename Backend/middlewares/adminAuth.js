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

        req.body.adminId = decodedToken.adminId;

        next(); 

    } catch (error) {
        console.log(error , 'midlwre error');
    }
}