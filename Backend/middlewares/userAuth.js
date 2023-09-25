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

        token = token.replaceAll('"',"");

        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        if(decoded.role === 'Candidate'){
            const user = await userModel.findById(decoded.userId);
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized - User not found' });
            }
            req.user = user;
            console.log(user); 

        } else if (decoded.role === 'Company'){
            const company = await companyModel.findById(decoded.userId);
            if(!company){
                return res.status(401).json({ message: 'Unauthorized - User not found' });
            }
            req.user = company;
            console.log(company);
        }
        next();

    } catch (error) {
        console.log(error);
    }
}