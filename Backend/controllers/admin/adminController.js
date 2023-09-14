import adminModel from "../../models/admin.js";
import jwt from "jsonwebtoken";


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
